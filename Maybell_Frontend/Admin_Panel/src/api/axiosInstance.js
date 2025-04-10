import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: "http://localhost:5000/api/v1/admin",
});

export default axiosInstance;
