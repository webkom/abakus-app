import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage } from 'jotai/utils';

const asyncStringStorage = {
  getItem: async (key: string, initialValue: string | undefined) => {
    const stored = await AsyncStorage.getItem(key);
    return stored ?? initialValue;
  },
  setItem: async (key: string, value: string | undefined) => {
    if (value === undefined) {
      await AsyncStorage.removeItem(key);
      return;
    }
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export const tokenAtom = atomWithStorage<string | undefined>(
  'session-token',
  undefined,
  asyncStringStorage
);
