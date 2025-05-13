import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

export const instances = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookies to be sent
});
