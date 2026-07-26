# Abakus App

> Mobile app for abakus.no

## Prerequisites

- Node.js
- npm
- Expo account with access to the `webkom` project

## Install dependencies

```bash
npm install
```

## Build and install the development client

Log in to Expo:

```bash
npx eas-cli login
```

Build the development client:

```bash
# Android
npx eas-cli build --platform android --profile development

# iOS
npx eas-cli build --platform ios --profile development
```

After 10-15 minutes the build should be completed. Open the EAS build page, download the generated development build, and install it on your device.

> **Note:** This only needs to be done after a new build.

## Start the development server

```bash
npx expo start --dev-client
```

With the development build installed, open the app on your device (or scan the QR code from within the app) to connect to the local Metro server.
