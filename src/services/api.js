import axios from "axios";

export const fetchData = async (fileName = "") => {
  try {
    const response = await axios.get(
      `http://localhost:5000/files/data${
        fileName ? `?fileName=${fileName}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
