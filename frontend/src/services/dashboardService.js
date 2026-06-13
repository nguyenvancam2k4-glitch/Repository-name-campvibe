import { getApiUrl } from "../config/apiConfig"

export async function getAdminDashboard() {
  const response = await fetch(getApiUrl("/dashboard/admin"))
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể tải dashboard")
  }

  return result.data
}
