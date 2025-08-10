import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.mgail',
  appName: 'OrgMobile',
  webDir: 'dist',
  android: {
    adjustMarginsForEdgeToEdge: 'force'
  }
};

export default config;
