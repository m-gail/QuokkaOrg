import { registerPlugin } from '@capacitor/core'

export interface File {
  absolutePath: string
  relativePath: string
  lastModified: number
  name: string
  type: 'FILE' | 'FOLDER'
}

export interface FilePath {
  path: string
}

export interface FolderPath {
  root: string
  directory: string
}

export interface IgnoredFolders {
  ignoredFolders: string[]
}

export interface FileContent {
  content: string
}

export interface RelativeFileAppend {
  relativeSubPath: string
  content: string
}

export interface DirectoryPickerPlugin {
  pickDirectory(): Promise<FilePath>
  recursivelyListDirectory(options: FilePath & IgnoredFolders): Promise<{ files: File[] }>
  listDirectory(options: FolderPath): Promise<{ files: File[] }>
  readFile(options: FilePath): Promise<FileContent>
  appendToFile(options: FilePath & RelativeFileAppend): Promise<File>
}

export const DirectoryPicker = registerPlugin<DirectoryPickerPlugin>('DirectoryPicker', {
  web: import('@/plugins/directory-picker/web').then((m) => new m.WebDirectoryPicker()),
})
