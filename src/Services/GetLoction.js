import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

export const GetLocation = async (value) => {
  setQuery(value);

  if (value.length < 3) {
    setResults([]);
    return;
  }

  try {
    const response = await axios.get(
      `${BASE_URL.replace(/\/$/, "")}/api/location/search`,
      {
        params: { q: value },
      }
    );

    setResults(response.data);
  } catch (error) {
    console.error("Error fetching location:");
  }
};
// ok