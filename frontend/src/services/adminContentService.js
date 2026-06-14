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
    throw new Error(result.message || "Không thể xử lý yêu cầu quản trị")
  }

  return result.data
}

export async function getAdminContent() {
  return request("/admin/content")
}

export async function createAdminPlace(data) {
  return request("/admin/places", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateAdminPlace(id, data) {
  return request(`/admin/places/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function updateAdminPlaceStatus(id, status) {
  return request(`/admin/places/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}

export async function createAdminExperience(data) {
  return request("/admin/experiences", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateAdminExperience(id, data) {
  return request(`/admin/experiences/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function updateAdminExperienceStatus(id, status) {
  return request(`/admin/experiences/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}

export async function createAdminBlogPost(data) {
  return request("/admin/blog-posts", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateAdminBlogPost(id, data) {
  return request(`/admin/blog-posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function updateAdminBlogPostStatus(id, status) {
  return request(`/admin/blog-posts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}

export async function updateAdminUserStatus(id, status) {
  return request(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
}
