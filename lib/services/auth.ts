// TODO: Clean up this file

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CurrentUser } from '../types/user';
import { api } from './api';

// Login-funksjon
export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const response = await api.post<{ token: string; user: CurrentUser }>(
      `/authorization/token-auth/`,
      {
        username,
        password,
      }
    );

    const { token, user } = response.data;

    return { token, user };
  } catch (error) {
    throw error;
  }
};

export const me = async () => {
  try {
    const token = await AsyncStorage.getItem('session-token');
    if (!token) return;

    const response = await axios.get<CurrentUser>(`me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.error('User fetch error: ', JSON.stringify(e));
    throw e;
  }
};

// Logout-funksjon
export const logout = async () => {
  await AsyncStorage.removeItem('session-token');
};

// Hent token
export const getToken = async () => {
  return await AsyncStorage.getItem('session-token');
};
