import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { components } from '../types/schema';

export type User = components['schemas']['CurrentUser'];

const asyncJSONStorage = createJSONStorage<User | undefined>(() => AsyncStorage);
export const userAtom = atomWithStorage<User | undefined>('user', undefined, asyncJSONStorage);
