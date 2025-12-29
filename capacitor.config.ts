import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.mgail',
  appName: 'QuokkaOrg',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_notification"
    }
  }
};

export default config;
