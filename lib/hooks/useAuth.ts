import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { userAtom } from '../atoms/user-atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { useSetAtom } from 'jotai/react';

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
      AsyncStorage.setItem("session-token", token)
      setUser(user);
    },
  });

  const signOut = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('session-token');
    setUser({} as User);
  };

  return {
    signInAsync,
    signIn,
    signOut,
    ...rest,
  };
};
