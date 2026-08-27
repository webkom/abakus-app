import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchClient } from '../services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

type NotificationData = {
  screen: string;
  params?: Record<string, string>;
};

const registerPushToken = async (expoPushToken: Notifications.ExpoPushToken) => {
  const { error } = await fetchClient.POST('/api/v1/device-expo/', {
    body: { pushToken: expoPushToken.data } as never,
  });
  if (error) {
    throw error;
  }
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    try {
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
    } catch {
      return;
    }
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }
}

export const usePushNotifications = (isLoggedIn: boolean): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);
  const isNavigatingRef = useRef(false);
  const checkedColdStartRef = useRef(false);
  const router = useRouter();

  const handleNotificationResponse = useCallback(
    async (response: Notifications.NotificationResponse) => {
      if (isNavigatingRef.current) return;
      const data = response.notification.request.content.data as NotificationData;
      if (!data?.screen) return;
      if (typeof data.screen !== 'string') return;
      isNavigatingRef.current = true;
      try {
        router.push({
          pathname: data.screen,
          params: { ...data.params },
        });
      } catch (error) {
        console.error(`Error handling notification tap ${error}`);
      } finally {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1000);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    if (!checkedColdStartRef.current) {
      checkedColdStartRef.current = true;
      const response = Notifications.getLastNotificationResponse();
      if (response) {
        handleNotificationResponse(response);
      }
    }

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      if (token) {
        registerPushToken(token).catch((err) => {
          console.warn('Failed to register push token', err);
        });
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [isLoggedIn, handleNotificationResponse]);

  return {
    expoPushToken,
    notification,
  };
};
