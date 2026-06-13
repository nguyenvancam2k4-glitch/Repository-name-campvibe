import { getApiUrl } from "../config/apiConfig"

export async function createContactMessage(data) {
  const response = await fetch(getApiUrl("/contacts"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể gửi liên hệ")
  }

  return result.data
}

export async function getContactMessages() {
  const response = await fetch(getApiUrl("/contacts"))
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể tải danh sách liên hệ")
  }

  return result.data || []
}

export async function updateContactStatus(id, status) {
  const response = await fetch(getApiUrl(`/contacts/${id}/status`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể cập nhật trạng thái liên hệ")
  }

  return result.data
}
