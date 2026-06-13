import dotenv from "dotenv"
import { pool } from "../config/db.js"
import { findAllBookings } from "../models/bookingModel.js"

dotenv.config()

async function main() {
  try {
    const bookings = await findAllBookings()

    console.log("✅ Lấy đơn đặt phòng từ PostgreSQL thành công!")
    console.log("Số đơn:", bookings.length)
    console.log("Đơn mới nhất:", bookings[0]?.bookingCode)
    console.log("Nguồn dữ liệu: PostgreSQL")
  } catch (error) {
    console.error("❌ Lấy đơn đặt phòng từ PostgreSQL thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
