import { defineStore } from 'pinia'

type SettingsStore = {
  directoryPath: string
  ignoredFolders: string[]
  newEventDefaultFile: string
}

export const useSettingsStore = defineStore('settings', {
  state: () =>
    ({
      directoryPath: '',
      newEventDefaultFile: '',
      ignoredFolders: ['.stversions'],
    }) as SettingsStore,
  actions: {
    setDirectoryPath(path: string) {
      this.directoryPath = path
    },
    setIgnoredFolders(ignoredFolders: string[]) {
      this.ignoredFolders = ignoredFolders
    },
    setNewEventDefaultFile(newEventDefaultFile: string) {
      this.newEventDefaultFile = newEventDefaultFile
    },
  },
  persist: true,
})
