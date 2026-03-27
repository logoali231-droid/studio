import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codeascent.app',
  appName: 'Code Ascent',
  webDir: 'public', // Using public directory as a placeholder
  bundledWebRuntime: false,
  server: {
    url: 'http://10.0.2.2:9002', // Standard Next.js dev server port mapped for Android Emulators
    cleartext: true
  }
};

export default config;
