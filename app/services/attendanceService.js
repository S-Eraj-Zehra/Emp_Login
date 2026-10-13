import axios from "axios";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/attendance/today`;

const getAttendance = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Unable to load attendance",
      );
    } else {
      throw new Error("Network Error");
    }
  }
};
export default {
  getAttendance,
};
