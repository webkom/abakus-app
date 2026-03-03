import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from 'env';

console.log('API URL: ', env.EXPO_PUBLIC_API_URL);
export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('session-token');
  if (token) {
    // config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
