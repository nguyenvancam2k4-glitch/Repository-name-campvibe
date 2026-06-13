import { bookings as mockBookings } from "../data/bookings"
import { API_CONFIG, getApiUrl } from "../config/apiConfig"

function normalizeBooking(booking = {}) {
  return {
    ...booking,
    id: String(booking.id || ""),
    userId: booking.userId || booking.user_id ? String(booking.userId || booking.user_id) : null,
    placeId: booking.placeId || booking.place_id ? String(booking.placeId || booking.place_id) : "",
    placeName: booking.placeName || booking.place_name || booking.place || "",
    placeLocation: booking.placeLocation || booking.place_location || booking.location || "",
    placeImageUrl: booking.placeImageUrl || booking.place_image_url || booking.imageUrl || booking.image_url || "",
    customerName: booking.customerName || booking.customer_name || booking.fullName || booking.full_name || "",
    customerEmail: booking.customerEmail || booking.customer_email || booking.email || "",
    customerPhone: booking.customerPhone || booking.customer_phone || booking.phone || "",
    bookingCode: booking.bookingCode || booking.booking_code || "",
    status: booking.status || "pending",
    checkInDate: booking.checkInDate || booking.check_in_date || booking.check_in || null,
    checkOutDate: booking.checkOutDate || booking.check_out_date || booking.check_out || null,
    guestCount: Number(booking.guestCount || booking.guest_count || booking.guests || 1),
    note: booking.note || booking.message || "",
    totalAmount: Number(booking.totalAmount || booking.total_amount || booking.totalPrice || booking.total_price || 0),
    paymentMethod: booking.paymentMethod || booking.payment_method || null,
    paymentStatus: booking.paymentStatus || booking.payment_status || "unpaid",
    paidAmount: Number(booking.paidAmount || booking.paid_amount || 0),
    transactionCode: booking.transactionCode || booking.transaction_code || null,
    paidAt: booking.paidAt || booking.paid_at || null,
    createdAt: booking.createdAt || booking.created_at || null,
    updatedAt: booking.updatedAt || booking.updated_at || null,
  }
}

export async function createBooking(bookingData) {
  if (API_CONFIG.USE_MOCK_DATA) {
    return normalizeBooking({ id: Date.now(), bookingCode: `CVB-${Date.now()}`, status: "pending", ...bookingData })
  }
  const response = await fetch(getApiUrl("/bookings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "Không thể gửi yêu cầu đặt phòng")
  return normalizeBooking(result.data)
}

export async function getBookings() {
  if (API_CONFIG.USE_MOCK_DATA) return mockBookings.map(normalizeBooking)
  const response = await fetch(getApiUrl("/bookings"))
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "Không thể tải danh sách đặt phòng")
  return (result.data || []).map(normalizeBooking)
}

export async function getCustomerBookings(userId) {
  if (!userId) return []
  if (API_CONFIG.USE_MOCK_DATA) return mockBookings.filter((item) => String(item.userId) === String(userId)).map(normalizeBooking)
  const response = await fetch(getApiUrl(`/bookings/customer/${userId}`))
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "Không thể tải lịch sử đặt phòng")
  return (result.data || []).map(normalizeBooking)
}

export async function getBookingById(id) {
  if (API_CONFIG.USE_MOCK_DATA) return normalizeBooking(mockBookings.find((item) => String(item.id) === String(id)) || mockBookings[0])
  const response = await fetch(getApiUrl(`/bookings/${id}`))
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "Không thể tải đơn đặt phòng")
  return normalizeBooking(result.data)
}

export async function updateBookingStatus(id, status) {
  if (API_CONFIG.USE_MOCK_DATA) return normalizeBooking({ id, status })
  const response = await fetch(getApiUrl(`/bookings/${id}/status`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "Không thể cập nhật trạng thái đặt phòng")
  return normalizeBooking(result.data)
}
