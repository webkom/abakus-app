// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "https://lego-staging.abakus.no"; // Backend URL

// // Login-funksjon
// export const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/authorization/token-auth/`, {
//       username,
//       password,
//     });
//     const { token } = response.data;
//     console.log(token);

//     // Lagre token i AsyncStorage
//     await AsyncStorage.setItem("jwt_token", token);
//     return token;
//   } catch (error) {
//     console.error("Login error1:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Logout-funksjon
// export const logout = async () => {
//   await AsyncStorage.removeItem("jwt_token");
// };

// // Hent token
// export const getToken = async () => {
//   console.log(await AsyncStorage.getItem("jwt_token"));
//   // eslint-disable-next-line no-return-await
//   return await AsyncStorage.getItem("jwt_token");
// };
