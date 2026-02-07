import axios from "axios";

const api = axios.create({
  baseURL: "https://api.vidoprompt.com/api",
});

export default api;
