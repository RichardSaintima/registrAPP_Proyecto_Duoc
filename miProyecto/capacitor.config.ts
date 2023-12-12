import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'io.cordova.hellocordova',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
