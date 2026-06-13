export const bookings = [
  {
    id: "booking-001",
    bookingCode: "CVB-2026-0171",
    userId: "user-001",
    placeId: "1",
    customerName: "Nguyễn Minh Anh",
    customerEmail: "minhanh@example.com",
    customerPhone: "0988 123 456",
    checkInDate: "2026-06-12",
    checkOutDate: "2026-06-13",
    guestCount: 2,
    tripType: "Đi cùng người yêu",
    note: "Muốn thêm BBQ và lửa trại buổi tối.",
    selectedServices: ["BBQ ngoài trời", "Đốt lửa trại"],
    totalAmount: 1620000,
    status: "pending",
    createdAt: "2026-06-08T08:00:00.000Z",
  },
  {
    id: "booking-002",
    bookingCode: "CVB-2026-0272",
    userId: "user-001",
    placeId: "2",
    customerName: "Nguyễn Minh Anh",
    customerEmail: "minhanh@example.com",
    customerPhone: "0988 123 456",
    checkInDate: "2026-06-18",
    checkOutDate: "2026-06-19",
    guestCount: 4,
    tripType: "Đi nhóm bạn",
    note: "Cần tư vấn chèo SUP.",
    selectedServices: ["Chèo SUP / hoạt động ngoài trời"],
    totalAmount: 1580000,
    status: "confirmed",
    createdAt: "2026-06-09T08:00:00.000Z",
  },
  {
    id: "booking-003",
    bookingCode: "CVB-2026-0373",
    userId: "user-001",
    placeId: "3",
    customerName: "Nguyễn Minh Anh",
    customerEmail: "minhanh@example.com",
    customerPhone: "0988 123 456",
    checkInDate: "2026-06-24",
    checkOutDate: "2026-06-25",
    guestCount: 3,
    tripType: "Nghỉ dưỡng cá nhân",
    note: "Muốn săn mây sáng sớm.",
    selectedServices: ["Săn mây buổi sáng", "BBQ ngoài trời"],
    totalAmount: 2130000,
    status: "completed",
    createdAt: "2026-06-10T08:00:00.000Z",
  },
]

export function getBookingById(id) {
  return bookings.find((booking) => booking.id === String(id)) || bookings[0]
}

export function getBookingsByUserId(userId) {
  return bookings.filter((booking) => booking.userId === String(userId))
}

export function getBookingsByPlaceId(placeId) {
  return bookings.filter((booking) => booking.placeId === String(placeId))
}
