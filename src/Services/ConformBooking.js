import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

const ConformBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      `${BASE_URL.replace(/\/$/, "")}/conform`,
      bookingData
    );
    // console.log('response :', response)
    if (response.status !== 200) {
      throw new Error("Booking confirmation failed");
    }

    return response;
  } catch (error) {
    return null;
  }
};
export default ConformBooking;
// ok