import { defineStore } from 'pinia'

type SettingsStore = {
  directoryPath: string
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({ directoryPath: '' }) as SettingsStore,
  actions: {
    setDirectoryPath(path: string) {
      this.directoryPath = path
    },
  },
  persist: true,
})
