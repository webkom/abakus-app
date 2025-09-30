import axios from "axios";
import * as SecureStore from "expo-secure-store";

const JWT_KEY = "jwt_token";
const API_URL = "https://lego-staging.abakus.no"; // Backend URL

// Login function
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/authorization/token-auth/`, {
      username,
      password,
    });
    const { token } = response.data;
    console.log(token);

    // Save token in SecureStore
    await SecureStore.setItemAsync(JWT_KEY, token);

    return token;
  } catch (error) {
    console.error("Login error1:", JSON.stringify(error));
    throw error;
  }
};

// Sign-out function
export const logout = async () => {
  await SecureStore.deleteItemAsync(JWT_KEY);
};

// Get token
export const getToken = async () => {
  return await SecureStore.getItem("jwt_token");
};
