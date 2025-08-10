import { defineStore } from 'pinia'

type SettingsStore = {
  directoryPath: string
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({ directoryPath: '' }) as SettingsStore,
})
