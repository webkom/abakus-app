import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { CurrentUser } from '../types/user';

const asyncJSONStorage = createJSONStorage<CurrentUser | undefined>(() => AsyncStorage);

export const userAtom = atomWithStorage<CurrentUser | undefined>(
  'user',
  undefined,
  asyncJSONStorage
);
