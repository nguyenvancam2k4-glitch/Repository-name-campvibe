export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  USE_MOCK_DATA: false,
}

export function getApiUrl(path) {
  return `${API_CONFIG.BASE_URL}${path}`
}
