import { PushNotificationState, usePushNotifications } from '@/lib/hooks/usePushNotifications';
import { createContext, useContext } from 'react';

const PushNotificationsContext = createContext<PushNotificationState>({});

export const usePushNotificationsContext = () => useContext(PushNotificationsContext);

export const PushNotificationsProvider = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) => {
  const state = usePushNotifications(isLoggedIn);

  return (
    <PushNotificationsContext.Provider value={state}>{children}</PushNotificationsContext.Provider>
  );
};
