package com.github.mgail;

import android.content.Context;
import android.net.Uri;

import androidx.documentfile.provider.DocumentFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class DocumentFileUtil {
    public static DocumentFile getFile(Context context, String rootPath, String relativePath) {
        return getFile(context, rootPath, relativePath, true);
    }

    public static DocumentFile getFile(Context context, String rootPath, String relativePath, boolean createMissing) {
        DocumentFile currentFile = DocumentFile.fromTreeUri(context, Uri.parse(rootPath));
        if (relativePath.equals("")) {
            return currentFile;
        }
        List<String> relativeSubPathParts = Arrays.asList(relativePath.split("/"));

        for (int i = 0; i < relativeSubPathParts.size(); i++) {
            boolean isLastPart = i == relativeSubPathParts.size() - 1;
            String part = relativeSubPathParts.get(i);

            DocumentFile nextFile = currentFile.findFile(part);
            if (nextFile == null) {
                if (!createMissing) {
                    return null;
                }
                if (isLastPart) {
                    nextFile = currentFile.createFile("plain/text", part);
                } else {
                    nextFile = currentFile.createDirectory(part);
                }
            }
            currentFile = nextFile;
        }

        return currentFile;
    }

    public static String combinePaths(String original, String toAdd) {
        if (original.equals("")) {
            return toAdd;
        }
        return original + "/" + toAdd;
    }

    public static String directoryName(String path) {
        List<String> parts = Arrays.stream(path.split("/")).collect(Collectors.toCollection(ArrayList::new));
        parts.remove(parts.size() - 1);
        return parts.stream().collect(Collectors.joining("/"));
    }
}
