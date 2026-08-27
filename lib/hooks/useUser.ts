import { useAtomValue } from 'jotai/react';
import { userAtom } from '../atoms/user-atom';
import { components } from '../types/schema';

type Group = components['schemas']['TypeEnum'];

export const useUser = () => {
  const user = useAtomValue(userAtom);

  // Calcualte the user class
  const grade = user?.abakusGroups?.find((group) => group.type === 'klasse');

  return { ...user, grade: grade?.name };
};
