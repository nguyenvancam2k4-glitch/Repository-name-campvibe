const DEFAULT_API_BASE_URL = "http://localhost:3000/api"

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL,
  USE_MOCK_DATA: false,
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${API_CONFIG.BASE_URL}${normalizedPath}`
}
