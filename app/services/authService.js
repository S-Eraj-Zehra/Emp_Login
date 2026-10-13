import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/login`;

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    await AsyncStorage.setItem("isLoggedIn", "true");

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login Failed");
    } else {
      throw new Error("Network Error");
    }
  }
};

const logout = async () => {
  await AsyncStorage.removeItem("isLoggedIn");
};

const isLoggedIn = async () => {
  const value = await AsyncStorage.getItem("isLoggedIn");
  return value === "true";
};

export default {
  login,
  logout,
  isLoggedIn,
};
