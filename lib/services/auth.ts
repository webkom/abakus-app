// TODO: Clean up this file

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://lego-staging.abakus.no'; // Backend URL

// Login-funksjon
export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/authorization/token-auth/`, {
      username,
      password,
    });
    const { token } = response.data;
    console.log(token);

    // Lagre token i AsyncStorage
    return token;
  } catch (error) {
    console.error('Login error: ', JSON.stringify(error));
    throw error;
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
