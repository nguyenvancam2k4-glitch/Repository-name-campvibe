import { blogPosts as mockBlogPosts, getBlogPostById } from "../data/blogPosts"
import { API_CONFIG, getApiUrl } from "../config/apiConfig"

const defaultImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
]

function formatDate(value) {
  if (!value) return "12 Tháng 6, 2026"

  try {
    const date = new Date(value)
    return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`
  } catch {
    return "12 Tháng 6, 2026"
  }
}

function normalizePost(post, index = 0) {
  return {
    ...post,
    id: String(post.id),
    image: post.image || post.imageUrl || defaultImages[index % defaultImages.length],
    imageUrl: post.imageUrl || post.image || defaultImages[index % defaultImages.length],
    date: post.date || formatDate(post.createdAt),
    readTime: post.readTime || "6 phút đọc",
    author: post.author || "CampVibe Blog",
    content:
      post.content ||
      "Nội dung bài viết đang được cập nhật. Khi kết nối backend hoàn chỉnh, phần này sẽ lấy trực tiếp từ cơ sở dữ liệu PostgreSQL.",
  }
}

export async function getBlogPosts() {
  if (API_CONFIG.USE_MOCK_DATA) {
    return mockBlogPosts.map(normalizePost)
  }

  try {
    const response = await fetch(getApiUrl("/blog-posts"))

    if (!response.ok) {
      throw new Error("Không thể tải bài viết")
    }

    const result = await response.json()
    return (result.data || []).map(normalizePost)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho blog:", error.message)
    return mockBlogPosts.map(normalizePost)
  }
}

export async function getBlogPostDetail(id) {
  if (API_CONFIG.USE_MOCK_DATA) {
    return normalizePost(getBlogPostById(id))
  }

  try {
    const response = await fetch(getApiUrl(`/blog-posts/${id}`))

    if (!response.ok) {
      throw new Error("Không thể tải chi tiết bài viết")
    }

    const result = await response.json()
    return normalizePost(result.data)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho blog detail:", error.message)
    return normalizePost(getBlogPostById(id))
  }
}
