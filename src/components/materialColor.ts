import { registerPlugin } from '@capacitor/core'

export interface SourceColor {
  source: string
}

export interface MaterialColorPlugin {
  getSourceColor(): Promise<SourceColor>
}

export const MaterialColor = registerPlugin<MaterialColorPlugin>('MaterialColor', {
  web: import('@/plugins/material-color/web').then((m) => new m.WebMaterialColor()),
})
