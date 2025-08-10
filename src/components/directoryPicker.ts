import { registerPlugin } from "@capacitor/core";

export interface File {
  path: string;
  name: string;
}

export interface FilePath {
  path: string;
}

export interface FileContent {
  content: string;
}

export interface DirectoryPickerPlugin {
  pickDirectory(): Promise<FilePath>;
  listDirectory(options: FilePath): Promise<{ files: File[] }>;
  readFile(options: FilePath): Promise<FileContent>;
}

export const DirectoryPicker =
  registerPlugin<DirectoryPickerPlugin>("DirectoryPicker");
