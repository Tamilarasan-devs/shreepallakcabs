import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api/vehicles`;

export const getAllVehicles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // { message: "cab booking is available now!" }
  } catch (error) {
    throw error;
  }
};
// ok