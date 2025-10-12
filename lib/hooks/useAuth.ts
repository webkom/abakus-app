import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';

// TODO: Set up this hook with jotai to get a reactive token and user info state!
export const useSignIn = () => {
  const {
    mutateAsync: signInAsync,
    mutate: signIn,
    ...rest
  } = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login({ username, password }),
  });

  return {
    signInAsync,
    signIn,
    ...rest,
  };
};
