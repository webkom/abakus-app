import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { userAtom } from '../atoms/user-atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetAtom } from 'jotai/react';
import { api } from '../services/api';

export const useSignIn = () => {
  const setUser = useSetAtom(userAtom);
  const {
    mutateAsync: signInAsync,
    mutate: signIn,
    ...rest
  } = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login({ username, password }),
    onSuccess: ({ token, user }) => {
      AsyncStorage.setItem('session-token', token);
      setUser(user);
    },
  });

  const signOut = async () => {
    try {
      await api.delete('/api/v1/device-expo/unregister/');
    } catch (err) {
      console.warn('Failed to unregister push token', err);
    }

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('session-token');
    setUser(undefined);
  };

  return {
    signInAsync,
    signIn,
    signOut,
    ...rest,
  };
};
