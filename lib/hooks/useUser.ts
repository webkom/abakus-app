import { useAtomValue } from 'jotai/react';
import { userAtom } from '../atoms/user-atom';

export const useUser = () => {
  const user = useAtomValue(userAtom);

  return user;
};
