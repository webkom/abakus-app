import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
const asyncJSONStorage = createJSONStorage<string | undefined>(() => AsyncStorage);

export const tokenAtom = atomWithStorage<string | undefined>(
  'session-token',
  undefined,
  asyncJSONStorage
);
