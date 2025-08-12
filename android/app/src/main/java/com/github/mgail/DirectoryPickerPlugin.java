package com.github.mgail;

import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.DocumentsContract;

import androidx.activity.result.ActivityResult;
import androidx.documentfile.provider.DocumentFile;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.stream.Collectors;

@CapacitorPlugin(name = "DirectoryPicker")
public class DirectoryPickerPlugin extends Plugin {

    @PluginMethod
    public void pickDirectory(PluginCall call) {
        Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        i.addCategory(Intent.CATEGORY_DEFAULT);
        i.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        startActivityForResult(call, i, "pickDirectoryResult");
    }

    @PluginMethod
    public void listDirectory(PluginCall call) {
        List<File> files = recursivelyListDirectory(call.getString("path"));
        JSObject ret = new JSObject();
        ret.put("files", new JSArray(files.stream().map(file -> {
            JSObject jsFile = new JSObject();
            jsFile.put("path", file.path());
            jsFile.put("name", file.name());
            return jsFile;
        }).collect(Collectors.toList())));
        call.resolve(ret);
    }

    @PluginMethod
    public void readFile(PluginCall call) throws IOException {
        DocumentFile file = DocumentFile.fromSingleUri(getContext(), Uri.parse(call.getString("path")));
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(getContext().getContentResolver().openInputStream(file.getUri())))) {
            String content = reader.lines().collect(Collectors.joining("\n"));
            JSObject result = new JSObject();
            result.put("content", content);
            call.resolve(result);
        } catch (IOException ioe) {
            throw ioe;
        }
    }

    private List<File> recursivelyListDirectory(String path) {
        ContentResolver contentResolver = getContext().getContentResolver();
        Uri rootContentUri = Uri.parse(path);
        Uri rootChildrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(rootContentUri, DocumentsContract.getTreeDocumentId(rootContentUri));
        Queue<Uri> directoryQueue = new LinkedList<>();
        directoryQueue.add(rootChildrenUri);
        List<File> files = new LinkedList<>();
        while (!directoryQueue.isEmpty()) {
            Uri childrenUri = directoryQueue.poll();
            try (Cursor cursor = contentResolver.query(childrenUri, new String[]{DocumentsContract.Document.COLUMN_DOCUMENT_ID, DocumentsContract.Document.COLUMN_DISPLAY_NAME, DocumentsContract.Document.COLUMN_MIME_TYPE}, null, null, null)) {
                while (cursor.moveToNext()) {
                    String documentId = cursor.getString(0);
                    String name = cursor.getString(1);
                    String mimeType = cursor.getString(2);
                    if (mimeType.equals(DocumentsContract.Document.MIME_TYPE_DIR)) {
                        if (name.equals(".stversions")) { // syncthing folder
                            continue;
                        }
                        directoryQueue.add(DocumentsContract.buildChildDocumentsUriUsingTree(rootContentUri, documentId));
                    } else if (name.endsWith(".org")) {
                        files.add(new File(DocumentsContract.buildDocumentUriUsingTree(rootContentUri, documentId).toString(), name));
                    }
                }
            }
        }
        return files;
    }

    @ActivityCallback
    private void pickDirectoryResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }

        var uri = result.getData().getData();
        getActivity().getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);

        String path = result.getData().getData().toString();
        JSObject directory = new JSObject();
        directory.put("path", path);
        call.resolve(directory);
    }
}
