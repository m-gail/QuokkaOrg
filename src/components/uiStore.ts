import { defineStore } from 'pinia'

type UIStore = {
  dockHeight: number;
}

export const useUIStore = defineStore('uiStore', {
  state: () => ({ dockHeight: 0 }) as UIStore,
  actions: {
    setDockHeight(dockHeight: number) {
      this.dockHeight = dockHeight
    },
  },
})
