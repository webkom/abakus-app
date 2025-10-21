import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { useAtomValue, useSetAtom } from 'jotai/react';
import { tokenAtom } from '../atoms/token-atom';
import { userAtom } from '../atoms/user-atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

export const useSignIn = () => {
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const {
    mutateAsync: signInAsync,
    mutate: signIn,
    ...rest
  } = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login({ username, password }),
    onSuccess: ({ token, user }) => {
      setToken(token);
      setUser(user);
    },
  });

  const signOut = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('session-token');
    setToken('');
    setUser({} as User);
  };

  return {
    signInAsync,
    signIn,
    signOut,
    ...rest,
  };
};

export const useToken = () => {
  return useAtomValue(tokenAtom);
};
