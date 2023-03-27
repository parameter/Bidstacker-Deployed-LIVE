import axios from "axios";

export async function adressToCoordinates(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
  
    try {
      const response = await axios.get(url);
      console.log("RESPONSE DATA", response.data)
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        throw new Error("Adress not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }
  