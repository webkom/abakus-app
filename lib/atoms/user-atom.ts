import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { User } from '../types/user';

const asyncJSONStorage = createJSONStorage<User | undefined>(() => AsyncStorage);

export const userAtom = atomWithStorage<User | undefined>('user', undefined, asyncJSONStorage);
