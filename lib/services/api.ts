import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from 'env';

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${await AsyncStorage.getItem('session-token')}`,
  },
});
