import { getApiUrl } from "../config/apiConfig"

async function request(path, options = {}) {
  const response = await fetch(getApiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || "Không thể xử lý yêu cầu tài khoản")
  }

  return result
}

export async function updateUserProfile(userId, data) {
  const result = await request(`/account/users/${userId}/profile`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })

  return result.data
}

export async function changeUserPassword(userId, data) {
  return request(`/account/users/${userId}/password`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deactivateUserAccount(userId, password) {
  const result = await request(`/account/users/${userId}/deactivate`, {
    method: "PATCH",
    body: JSON.stringify({ password }),
  })

  return result.data
}
