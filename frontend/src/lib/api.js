import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

export async function submitFreeTrial(payload) {
  const { data } = await api.post("/leads/free-trial", payload);
  return data;
}

export async function submitNewsletter(payload) {
  const { data } = await api.post("/leads/newsletter", payload);
  return data;
}

export async function submitContact(payload) {
  const { data } = await api.post("/leads/contact", payload);
  return data;
}

export async function fetchStats() {
  const { data } = await api.get("/leads/stats");
  return data;
}
