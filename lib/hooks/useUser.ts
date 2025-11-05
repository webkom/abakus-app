import { useAtomValue } from 'jotai/react';
import { userAtom } from '../atoms/user-atom';
import { GroupType } from '../types/user';

export const useUser = () => {
  const user = useAtomValue(userAtom);

  // Calcualte the user class
  const grade = user?.abakusGroups.find((group) => group.type === GroupType.Grade);

  return { ...user, grade: grade?.name };
};
