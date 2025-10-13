import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { useSetAtom } from 'jotai/react';
import { tokenAtom } from '../atoms/token-atom';

// TODO: Set up this hook with jotai to get a reactive token and user info state!
export const useSignIn = () => {
  const setToken = useSetAtom(tokenAtom);
  const {
    mutateAsync: signInAsync,
    mutate: signIn,
    ...rest
  } = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login({ username, password }),
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  const signOut = () => {
    setToken(undefined);
  };

  return {
    signInAsync,
    signIn,
    signOut,
    ...rest,
  };
};
