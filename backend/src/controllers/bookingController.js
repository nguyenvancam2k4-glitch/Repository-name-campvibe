import {
  createBookingRecord,
  findAllBookings,
  findBookingById,
  findBookingsByUserId,
  updateBookingStatusRecord,
} from "../models/bookingModel.js"

export async function getBookings(req, res, next) {
  try {
    const bookings = await findAllBookings()
    res.json({ success: true, source: "postgresql", count: bookings.length, data: bookings })
  } catch (error) {
    next(error)
  }
}

export async function getCustomerBookings(req, res, next) {
  try {
    const bookings = await findBookingsByUserId(req.params.userId)
    res.json({ success: true, source: "postgresql", count: bookings.length, data: bookings })
  } catch (error) {
    next(error)
  }
}

export async function getBookingById(req, res, next) {
  try {
    const booking = await findBookingById(req.params.id)
    if (!booking) return res.status(404).json({ success: false, message: "Không tìm thấy đơn đặt phòng" })
    res.json({ success: true, source: "postgresql", data: booking })
  } catch (error) {
    next(error)
  }
}

export async function createBooking(req, res, next) {
  try {
    const { userId, placeId, customerName, customerEmail, customerPhone, checkInDate, checkOutDate, guestCount, tripType, note, totalAmount } = req.body
    if (!placeId || !customerName || !customerPhone) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập địa điểm, họ tên và số điện thoại" })
    }
    const booking = await createBookingRecord({ userId, placeId, customerName, customerEmail, customerPhone, checkInDate, checkOutDate, guestCount, tripType, note, totalAmount })
    res.status(201).json({ success: true, source: "postgresql", message: "Gửi yêu cầu đặt phòng thành công", data: booking })
  } catch (error) {
    next(error)
  }
}

export async function updateBookingStatus(req, res, next) {
  try {
    const allowed = ["pending", "confirmed", "completed", "cancelled"]
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: "Trạng thái đơn không hợp lệ" })
    }
    const booking = await updateBookingStatusRecord(req.params.id, req.body.status)
    if (!booking) return res.status(404).json({ success: false, message: "Không tìm thấy đơn đặt phòng" })
    res.json({ success: true, source: "postgresql", message: "Cập nhật trạng thái thành công", data: booking })
  } catch (error) {
    next(error)
  }
}
