import type {
  DirectoryPickerPlugin,
  File,
  FileContent,
  FilePath,
} from '@/components/directoryPicker'
import { WebPlugin } from '@capacitor/core'

/**
 * Plugin for testing the app on web
 */
export class WebDirectoryPicker extends WebPlugin implements DirectoryPickerPlugin {
  constructor() {
    super()
  }
  async pickDirectory(): Promise<FilePath> {
    return { path: '/unknown' }
  }
  async listDirectory(): Promise<{ files: File[] }> {
    return { files: [{ path: '/unknown/index.org', name: 'index.org' }] }
  }
  async readFile(filePath: FilePath): Promise<FileContent> {
    if (filePath.path === '/unknown/index.org') {
      return {
        content: `
** Übung 1
<2025-08-10 Wed 15:00>
** Übung 2
<2025-08-07 Wed 15:00>
** Übung 3
<2025-08-09 Wed 15:00>
** Übung 4
<2025-08-24 Wed 15:00>
** Übung 5
<2025-08-30 Wed 15:00>
** Übung 6
<2025-08-31 Wed 15:00>
** Übung 7
<2025-09-01 Wed 15:00>
`,
      }
    } else {
      throw new Error()
    }
  }
}
