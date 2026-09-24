import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'lol.getedx.app',
  appName: 'edX Portal',
  webDir: 'dist',
  server: {
    // Uncomment the line below if you want your native Android app to live-reload directly from your laptop during development:
    // url: 'http://10.3.28.250:3000',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
