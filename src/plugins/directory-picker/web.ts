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
* Uni
** Algorithms and Datastructures Test
<2025-08-12 Wed 15:00>
** Theoretical Informatics Lecture
<2025-08-13 Wed 15:00>
* Private
** Cinema
<2025-08-15 Wed 15:00>
** Cycling Race
<2025-09-02 Wed 15:00>
** Marathon
<2025-09-03 Wed 15:00>
* Work
** Sprint Review
<2025-09-04 Wed 15:00>
** Sprint Retro
<2025-09-05 Wed 15:00>
`,
      }
    } else {
      throw new Error()
    }
  }
}
