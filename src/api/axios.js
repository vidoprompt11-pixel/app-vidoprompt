import axios from "axios";

const api = axios.create({
  baseURL: "https://vidoprompt-backend.vercel.app/api",
});

export default api;
