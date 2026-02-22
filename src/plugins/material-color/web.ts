import type { MaterialColorPlugin, SourceColor } from '@/components/materialColor'
import { WebPlugin } from '@capacitor/core'

/**
 * Plugin for testing the app on web
 */
export class WebMaterialColor extends WebPlugin implements MaterialColorPlugin {
  constructor() {
    super()
  }
  async getSourceColor(): Promise<SourceColor> {
    return {
      source: '#0000ff',
    }
  }
}
