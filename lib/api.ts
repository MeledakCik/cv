import { getFingerprint } from "./fingerprint";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const visitorId = await getFingerprint();

  const defaultHeaders = {
    "Content-Type": "application/json",
    "x-browser-fingerprint": visitorId,
  };

  return fetch(endpoint, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // Tetap bisa terima header custom kalau butuh
    },
  });
};