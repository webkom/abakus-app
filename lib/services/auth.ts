import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchClient } from './api';
import type { components } from '../types/schema';

type LoginResponse = {
  token: string;
  user: components['schemas']['CurrentUser'];
};

export const login = async ({ username, password }: { username: string; password: string }) => {
  const { data, error } = await fetchClient.POST('/authorization/token-auth/', {
    body: { username, password } as components['schemas']['JSONWebToken'],
  });

  if (error) {
    console.error('Login error: ', JSON.stringify(error));
    throw error;
  }

  return data as unknown as LoginResponse;
};

export const me = async () => {
  const { data, error } = await fetchClient.GET('/api/v1/users/me/');

  if (error) {
    console.error('User fetch error: ', JSON.stringify(error));
    throw error;
  }

  return data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('session-token');
};

export const getToken = async () => {
  return await AsyncStorage.getItem('session-token');
};
