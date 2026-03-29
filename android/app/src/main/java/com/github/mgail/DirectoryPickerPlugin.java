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

import org.json.JSONException;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
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
        i.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        startActivityForResult(call, i, "pickDirectoryResult");
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

    @PluginMethod
    public void listDirectory(PluginCall call) throws JSONException {
        List<String> ignoredFolders = call.getArray("ignoredFolders").toList();
        List<File> files = recursivelyListDirectory(call.getString("path"), ignoredFolders);
        JSObject ret = new JSObject();
        ret.put("files", new JSArray(files.stream().map(file -> {
            JSObject jsFile = new JSObject();
            jsFile.put("absolutePath", file.absolutePath());
            jsFile.put("relativePath", file.relativePath());
            jsFile.put("lastModified", file.lastModified());
            jsFile.put("name", file.name());
            return jsFile;
        }).collect(Collectors.toList())));
        call.resolve(ret);
    }

    private List<File> recursivelyListDirectory(String path, List<String> ignoredFolders) {
        ContentResolver contentResolver = getContext().getContentResolver();
        Uri rootContentUri = Uri.parse(path);
        Uri rootChildrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(rootContentUri, DocumentsContract.getTreeDocumentId(rootContentUri));
        Queue<RecursiveQueueItem> directoryQueue = new LinkedList<>();
        directoryQueue.add(new RecursiveQueueItem("", rootChildrenUri));
        List<File> files = new LinkedList<>();
        while (!directoryQueue.isEmpty()) {
            RecursiveQueueItem currentItem = directoryQueue.poll();
            Uri childrenUri = currentItem.uri();
            try (Cursor cursor = contentResolver.query(
                    childrenUri,
                    new String[]{
                            DocumentsContract.Document.COLUMN_DOCUMENT_ID,
                            DocumentsContract.Document.COLUMN_DISPLAY_NAME,
                            DocumentsContract.Document.COLUMN_MIME_TYPE,
                            DocumentsContract.Document.COLUMN_LAST_MODIFIED},
                    null, null, null)) {
                while (cursor.moveToNext()) {
                    String documentId = cursor.getString(0);
                    String name = cursor.getString(1);
                    String mimeType = cursor.getString(2);
                    long lastModified = cursor.getLong(3);
                    if (mimeType.equals(DocumentsContract.Document.MIME_TYPE_DIR)) {
                        if (ignoredFolders.contains(name)) {
                            continue;
                        }
                        directoryQueue.add(new RecursiveQueueItem(addToRelativePath(currentItem.relativePath(), name), DocumentsContract.buildChildDocumentsUriUsingTree(rootContentUri, documentId)));
                    } else if (name.endsWith(".org")) {
                        files.add(new File(DocumentsContract.buildDocumentUriUsingTree(rootContentUri, documentId).toString(), addToRelativePath(currentItem.relativePath(), name), name, lastModified));
                    }
                }
            }
        }
        return files;
    }

    private String addToRelativePath(String original, String toAdd) {
        if (original.equals("")) {
            return toAdd;
        }
        return original + "/" + toAdd;
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

    @PluginMethod
    public void appendToFile(PluginCall call) throws IOException {
        String contentToAppend = call.getString("content");
        String rootPath = call.getString("path");
        String relativeSubPath = call.getString("relativeSubPath");
        List<String> relativeSubPathParts = Arrays.asList(relativeSubPath.split("/"));

        DocumentFile currentFile = DocumentFile.fromTreeUri(getContext(), Uri.parse(rootPath));

        for (int i = 0; i < relativeSubPathParts.size(); i++) {
            boolean isLastPart = i == relativeSubPathParts.size() - 1;
            String part = relativeSubPathParts.get(i);

            DocumentFile nextFile = currentFile.findFile(part);
            if (nextFile == null) {
                if (isLastPart) {
                    nextFile = currentFile.createFile("plain/text", part);
                } else {
                    nextFile = currentFile.createDirectory(part);
                }
            }
            currentFile = nextFile;
        }

        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(getContext().getContentResolver().openOutputStream(currentFile.getUri(), "wa")))) {
            writer.append("\n");
            writer.append(contentToAppend);
        }
    }
}
