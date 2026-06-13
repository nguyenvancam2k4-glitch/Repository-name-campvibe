import { experiences as mockExperiences } from "../data/experiences"
import { API_CONFIG, getApiUrl } from "../config/apiConfig"

const experienceMeta = {
  "BBQ giữa rừng": {
    icon: "🔥",
    includes: ["Bếp nướng", "Than", "Bàn ghế", "Decor"],
  },
  "Đốt lửa trại": {
    icon: "🌙",
    includes: ["Củi", "Ghế trại", "Marshmallow", "Âm nhạc"],
  },
  "Chèo SUP bên hồ": {
    icon: "🏄‍♂️",
    includes: ["Ván SUP", "Áo phao", "Hướng dẫn", "Ảnh check-in"],
  },
  "Picnic đồi cỏ": {
    icon: "🧺",
    includes: ["Thảm picnic", "Đồ ăn nhẹ", "Nước uống", "Hoa decor"],
  },
  "Săn mây buổi sáng": {
    icon: "🌄",
    includes: ["Cà phê", "Hướng dẫn", "Điểm ngắm mây", "Ảnh kỷ niệm"],
  },
  "Trang trí sinh nhật": {
    icon: "🎂",
    includes: ["Bóng decor", "Bánh nhỏ", "Đèn led", "Bảng tên"],
  },
  "Combo cặp đôi": {
    icon: "💚",
    includes: ["Picnic", "BBQ nhẹ", "Đèn decor", "Không gian riêng"],
  },
  "Combo gia đình": {
    icon: "👨‍👩‍👧‍👦",
    includes: ["Khu ăn uống", "Trò chơi", "Lửa trại", "Chụp ảnh"],
  },
}

function normalizeExperience(item) {
  const meta = experienceMeta[item.title] || {}

  return {
    ...item,
    id: String(item.id),
    image: item.image || item.imageUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    imageUrl: item.imageUrl || item.image,
    price: item.priceText || `${Number(item.price || 0).toLocaleString("vi-VN")}đ`,
    priceNumber: Number(item.price || item.priceNumber || 0),
    icon: item.icon || meta.icon || "✨",
    includes: item.includes || meta.includes || ["Dịch vụ", "Tư vấn", "Setup"],
  }
}

export async function getExperiences() {
  if (API_CONFIG.USE_MOCK_DATA) {
    return mockExperiences.map(normalizeExperience)
  }

  try {
    const response = await fetch(getApiUrl("/experiences"))

    if (!response.ok) {
      throw new Error("Không thể tải trải nghiệm")
    }

    const result = await response.json()
    return (result.data || []).map(normalizeExperience)
  } catch (error) {
    console.warn("CampVibe dùng dữ liệu dự phòng cho experiences:", error.message)
    return mockExperiences.map(normalizeExperience)
  }
}
