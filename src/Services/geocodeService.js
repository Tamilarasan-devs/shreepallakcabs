import BASE_URL from "../Hooks/apiUrl";

export const fetchGeocode = async (from, to) => {
  try {
    const res = await fetch(
      `${BASE_URL.replace(/\/$/, "")}/distance?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}`
    );
    if (!res.ok) throw new Error("Failed to fetch distance");

    const data = await res.json();

    return data;
  } catch (error) {
    return null;
  }
};
// ok