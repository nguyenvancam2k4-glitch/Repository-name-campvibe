import { getApiUrl } from "../config/apiConfig"

export async function getUserFavorites(userId) {
  if (!userId) return []

  const response = await fetch(getApiUrl(`/favorites/user/${userId}`))
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể tải danh sách yêu thích")
  }

  return result.data || []
}

export async function checkFavorite(userId, placeId) {
  if (!userId || !placeId) return false

  const response = await fetch(getApiUrl(`/favorites/user/${userId}/place/${placeId}`))
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể kiểm tra yêu thích")
  }

  return Boolean(result.isFavorite)
}

export async function addFavorite(userId, placeId) {
  const response = await fetch(getApiUrl("/favorites"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, placeId }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể thêm yêu thích")
  }

  return result.data
}

export async function removeFavorite(userId, placeId) {
  const response = await fetch(getApiUrl(`/favorites/user/${userId}/place/${placeId}`), {
    method: "DELETE",
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Không thể xóa yêu thích")
  }

  return result.data
}

export async function toggleFavorite(userId, placeId, currentState) {
  if (currentState) {
    await removeFavorite(userId, placeId)
    return false
  }

  await addFavorite(userId, placeId)
  return true
}
