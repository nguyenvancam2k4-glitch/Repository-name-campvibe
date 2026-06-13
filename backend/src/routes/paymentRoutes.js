import express from "express"
import { pool } from "../config/db.js"

const router = express.Router()

function normalizePaymentMethod(method) {
  const allowed = ["cash", "bank_transfer", "e_wallet", "domestic_card"]
  return allowed.includes(method) ? method : "cash"
}

function getPaymentStatus(method) {
  return method === "cash" ? "pay_at_property" : "paid"
}

function makeTransactionCode(method) {
  const prefix = method === "cash" ? "PAYLATER" : "CVPAY"
  const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "")
  const randomPart = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}-${datePart}-${randomPart}`
}

router.post("/bookings/:id/pay", async (req, res) => {
  try {
    const bookingId = Number(req.params.id)
    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({ success: false, message: "Mã đơn đặt phòng không hợp lệ" })
    }

    const paymentMethod = normalizePaymentMethod(req.body.method)
    const paymentStatus = getPaymentStatus(paymentMethod)
    const transactionCode = makeTransactionCode(paymentMethod)

    const bookingResult = await pool.query(
      `SELECT id, booking_code, status, total_amount FROM bookings WHERE id = $1::int`,
      [bookingId]
    )

    if (bookingResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn đặt phòng" })
    }

    const amountFromClient = Number(req.body.amount || 0)
    const amountFromBooking = Number(bookingResult.rows[0].total_amount || 0)
    const finalAmount = amountFromClient > 0 ? amountFromClient : amountFromBooking

    // Với thanh toán khi nhận phòng, hệ thống chỉ ghi nhận phương thức, chưa ghi nhận tiền đã thu.
    const paidAmount = paymentStatus === "paid" ? finalAmount : 0
    const paidAt = paymentStatus === "paid" ? new Date().toISOString() : null

    const result = await pool.query(
      `
        UPDATE bookings
        SET
          payment_method = $1::varchar,
          payment_status = $2::varchar,
          paid_amount = $3::numeric,
          transaction_code = $4::varchar,
          paid_at = $5::timestamp,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6::int
        RETURNING
          id,
          booking_code,
          status,
          total_amount,
          payment_method,
          payment_status,
          paid_amount,
          transaction_code,
          paid_at,
          updated_at
      `,
      [paymentMethod, paymentStatus, paidAmount, transactionCode, paidAt, bookingId]
    )

    return res.json({
      success: true,
      message: paymentStatus === "paid" ? "Thanh toán thành công" : "Đã ghi nhận thanh toán khi nhận phòng",
      data: result.rows[0],
    })
  } catch (error) {
    console.error("Payment error:", error)
    return res.status(500).json({
      success: false,
      message: "Không thể xử lý thanh toán",
      error: error.message,
    })
  }
})

router.get("/bookings/:id/payment", async (req, res) => {
  try {
    const bookingId = Number(req.params.id)
    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({ success: false, message: "Mã đơn đặt phòng không hợp lệ" })
    }

    const result = await pool.query(
      `
        SELECT
          id,
          booking_code,
          status,
          total_amount,
          payment_method,
          payment_status,
          paid_amount,
          transaction_code,
          paid_at
        FROM bookings
        WHERE id = $1::int
      `,
      [bookingId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy thông tin thanh toán" })
    }

    return res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể tải thông tin thanh toán",
      error: error.message,
    })
  }
})

export default router
