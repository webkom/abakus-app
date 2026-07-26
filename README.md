# Abakus App

> Mobile app for abakus.no

## Prerequisites

- Node.js
- npm
- Expo account with access to the `webkom` organization

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

Once the build has completed (typically within 10–15 minutes), open the EAS build page, download the development build, and install it on your device.

> **Note:** A new development build is only required after native changes, such as:
>
> - adding or updating native dependencies
> - changing the Expo configuration
> - updating Firebase configuration
> - upgrading the Expo SDK

## Start the development server

```bash
npx expo start --dev-client
```

With the development build installed, open the app on your device and connect to the local Metro server.
