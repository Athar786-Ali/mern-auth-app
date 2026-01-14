import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-mern-auth-g9r2.onrender.com/api",
  withCredentials: true
});


export default api;

