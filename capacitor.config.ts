import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Absensi Sholat SMPN 19 JAKARTA SELATAN',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      androidScaleType:"CENTER_CROP"
    },
  }
};

export default config;
