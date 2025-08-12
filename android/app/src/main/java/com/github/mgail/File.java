package com.github.mgail;

public record File(String absolutePath, String relativePath, String name, long lastModified) {
}
