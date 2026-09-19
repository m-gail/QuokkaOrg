import type {
  DirectoryPickerPlugin,
  File,
  FileContent,
  FilePath,
  FolderPath,
  RelativeFileAppend,
} from '@/components/directoryPicker'
import { WebPlugin } from '@capacitor/core'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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
  async listDirectory(options: FolderPath): Promise<{ files: File[] }> {
    if (options.directory === '') {
      return {
        files: [
          {
            absolutePath: '/unknown/Subfolder1',
            relativePath: 'Subfolder1',
            name: 'Subfolder1',
            lastModified: 4,
            type: 'FOLDER',
          },
          {
            absolutePath: '/unknown/Subfolder1',
            relativePath: 'Subfolder2',
            name: 'Subfolder2',
            lastModified: 4,
            type: 'FOLDER',
          },
          {
            absolutePath: '/unknown/index.org',
            relativePath: 'index.org',
            name: 'index.org',
            lastModified: 4,
            type: 'FILE',
          },
          {
            absolutePath: '/unknown/index2.org',
            relativePath: 'index2.org',
            name: 'index2.org',
            lastModified: 3,
            type: 'FILE',
          },
        ],
      }
    }
    if (options.directory === 'Subfolder1') {
      return {
        files: [
          {
            absolutePath: '/unknown',
            relativePath: '',
            name: '..',
            lastModified: 4,
            type: 'FOLDER',
          },
          {
            absolutePath: '/unknown/Subfolder1/Sub1.org',
            relativePath: 'Subfolder1/Sub1.org',
            name: 'Sub1.org',
            lastModified: 4,
            type: 'FILE',
          },
        ],
      }
    }
    if (options.directory === 'Subfolder2') {
      return {
        files: [
          {
            absolutePath: '/unknown',
            relativePath: '',
            name: '..',
            lastModified: 4,
            type: 'FOLDER',
          },
          {
            absolutePath: '/unknown/Subfolder2/Sub2.org',
            relativePath: 'Subfolder2/Sub2.org',
            name: 'Sub2.org',
            lastModified: 4,
            type: 'FILE',
          },
        ],
      }
    }
    return {
      files: [],
    }
  }
  async recursivelyListDirectory(): Promise<{ files: File[] }> {
    const root = await this.listDirectory({ directory: '', root: '/unknown' })
    const sub1 = await this.listDirectory({ directory: 'Sub1', root: '/unknown' })
    const sub2 = await this.listDirectory({ directory: 'Sub2', root: '/unknown' })
    return {
      files: [...root.files, ...sub1.files, ...sub2.files].filter((file) => file.type === 'FILE'),
    }
  }
  async readFile(filePath: FilePath): Promise<FileContent> {
    if (filePath.path === '/unknown/index.org') {
      return {
        content: `
* Uni
** Algorithms and Datastructures Test
DEADLINE: <2025-08-12 Wed 18:00>
** Algorithms and Datastructures Test
SCHEDULED: <2025-08-11 Wed 18:00>
** Analysis Test
<2025-08-12 Wed 16:00>
** Security Test
<2025-08-12 Wed 17:00>
** Theoretical Informatics Lecture
<2025-08-13 Wed 15:00-17:00>
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
    } else if (filePath.path === '/unknown/index2.org') {
      return {
        content: `
* Unrelated
<2025-08-14 Wed 19:00>
* Bi-Monthly Repeat
<2026-09-17 Thu 14:00 +2m>
* Yearly Repeat
<2003-09-15 Tue 14:00 +1y>
* Tri-Daily Repeat
<2026-09-01 Tue 14:00 +3d>
* Friday Repeat
<2026-09-04 Fri 14:00 +1w>
`,
      }
    } else if (
      ['/unknown/Subfolder1/Sub1.org', '/unknown/Subfolder2/Sub2.org'].includes(filePath.path)
    ) {
      return { content: '' }
    } else {
      throw new Error()
    }
  }
  async appendToFile(options: FilePath & RelativeFileAppend): Promise<File> {
    await sleep(500)
    console.log(`-- Appending --
${options.path}
${options.relativeSubPath}
${options.content}
-- Appending --
`)
    return {
      absolutePath: '/unknown/' + options.relativeSubPath,
      relativePath: options.relativeSubPath,
      name: options.relativeSubPath,
      lastModified: 0,
      type: 'FILE',
    }
  }
}
