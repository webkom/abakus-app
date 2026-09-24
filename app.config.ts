import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Abakus',
  slug: 'abakus-app',
  version: '0.0.0',
  scheme: 'abakus',
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-notifications',
    'expo-audio',
    'expo-asset',
    'expo-image',
    'expo-status-bar',
  ],
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'no.abakus.app',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'no.abakus.app',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  extra: {
    router: {},
    eas: {
      projectId: '58d655fc-a346-4b64-b5a7-8eb2d9cab7d4',
    },
  },
  owner: 'webkom',
};

export default config;
