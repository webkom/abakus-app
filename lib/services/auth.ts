// TODO: Clean up this file

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const API_URL = 'https://lego-staging.abakus.no'; // Backend URL

// Login-funksjon
export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const response = await axios.post<{ token: string; user: User }>(
      `${API_URL}/authorization/token-auth/`,
      {
        username,
        password,
      }
    );
    const { token, user } = response.data;

    return { token, user };
  } catch (error) {
    console.error('Login error: ', JSON.stringify(error));
    throw error;
  }
};

export const me = async () => {
  try {
    const token = await AsyncStorage.getItem('session-token');
    if (!token) return;

    const response = await axios.get<User>(`${API_URL}/me`, {
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
  console.log(await AsyncStorage.getItem('session-token'));
  return await AsyncStorage.getItem('session-token');
};
