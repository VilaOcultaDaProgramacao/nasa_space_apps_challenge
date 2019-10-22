import axios from "axios";

const api = axios.create({
  baseURL: "https://2c41e213.ngrok.io"
});

export default api;
