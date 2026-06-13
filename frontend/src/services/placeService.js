import { featuredPlaces, getPlaceById, places as mockPlaces } from "../data/places"
import { API_CONFIG, getApiUrl } from "../config/apiConfig"

function normalizePlace(place) {
  return {
    ...place,
    id: String(place.id),
    image: place.image || place.imageUrl,
    imageUrl: place.imageUrl || place.image,
    price: place.priceText || place.price,
    priceNumber: Number(place.price || place.priceNumber || 0),
    rating: Number(place.rating || 0),
    reviews: place.reviews || place.reviewsCount || 0,
    reviewsCount: place.reviewsCount || place.reviews || 0,
    tags: place.tags || place.amenities || [],
    amenities: place.amenities || place.tags || [],
    gallery: place.gallery || [],
  }
}

export async function getPlaces() {
  if (API_CONFIG.USE_MOCK_DATA) {
    return mockPlaces.map(normalizePlace)
  }

  try {
    const response = await fetch(getApiUrl("/places"))

    if (!response.ok) {
      throw new Error("Không thể tải danh sách địa điểm")
    }

    const result = await response.json()
    return (result.data || []).map(normalizePlace)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho places:", error.message)
    return mockPlaces.map(normalizePlace)
  }
}

export async function getFeaturedPlaces() {
  if (API_CONFIG.USE_MOCK_DATA) {
    return featuredPlaces.map(normalizePlace)
  }

  try {
    const places = await getPlaces()
    return places.slice(0, 3)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho featured places:", error.message)
    return featuredPlaces.map(normalizePlace)
  }
}

export async function getPlaceDetail(id) {
  if (API_CONFIG.USE_MOCK_DATA) {
    return normalizePlace(getPlaceById(id))
  }

  try {
    const response = await fetch(getApiUrl(`/places/${id}`))

    if (!response.ok) {
      throw new Error("Không thể tải chi tiết địa điểm")
    }

    const result = await response.json()
    return normalizePlace(result.data)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho place detail:", error.message)
    return normalizePlace(getPlaceById(id))
  }
}
