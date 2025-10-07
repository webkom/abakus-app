// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://lego-staging.abakus.no/api/v1"; // Backend URL

// Login-funksjon
export const register = async (eventId, captchaResponse, feedback, userId) => {
  if (!feedback) {
    try {
      console.log("test2");
      console.log(feedback);
      const response = await axios.post(
        `${API_URL}/events/${eventId}/registrations/`,
        {
          captchaResponse,
          feedback: "",
        },
        {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );
      const { token } = response.data;
      console.log("fijeafjeajfoia", token);
    } catch (error) {
      console.error("Login error2:", error.response?.data || error.message);
      throw error;
    }
  } else {
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/registrations/`,
        {
          captchaResponse,
        },
        {
          meta: {
            id: eventId,
            userId,
          },
        }
      );
      const { token } = response.data;
      console.log(token);

      // Lagre token i AsyncStorage
      await SecureStore.setItemAsync("jwt_token", token);
      return token;
    } catch (error) {
      console.error("Login error3:", error.response?.data || error.message);
      throw error;
    }
  }
};

export const unregister = async (eventId, registrationId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/events/${eventId}/registrations/${registrationId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Successfully unregistered:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Unregistration error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Logout-funksjon
export const logout = async () => {
  await SecureStore.deleteItemAsync("jwt_token");
};

// Hent token
export const getCapchaToken = async () => {
  console.log(await SecureStore.getItem("jwt_token"));

  return await SecureStore.getItem("jwt_token");
};
