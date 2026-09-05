package com.github.mgail;

import androidx.documentfile.provider.DocumentFile;

import com.getcapacitor.JSObject;

public record File(String absolutePath, String relativePath, String name, long lastModified,
                   String type) {
    public JSObject toJSObject() {
        JSObject jsFile = new JSObject();
        jsFile.put("absolutePath", this.absolutePath());
        jsFile.put("relativePath", this.relativePath());
        jsFile.put("lastModified", this.lastModified());
        jsFile.put("type", this.type());
        jsFile.put("name", this.name());
        return jsFile;
    }

    public static File fromDocumentFile(DocumentFile df, String parentRelativePath) {
        return fromDocumentFile(df, DocumentFileUtil.combinePaths(parentRelativePath, df.getName()), df.getName());
    }

    public static File fromDocumentFile(DocumentFile df, String relativePath, String name) {
        return new File(
                df.getUri().toString(),
                relativePath,
                name,
                df.lastModified(),
                df.isDirectory() ? "FOLDER" : "FILE"
        );
    }
}
