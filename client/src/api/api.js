import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-mern-auth-pi.vercel.app/api",
  withCredentials: true
});


export default api;

