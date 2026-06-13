import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    const users = await pool.query("SELECT id, full_name, email FROM users WHERE role='customer' ORDER BY id DESC LIMIT 1")
    if (users.rows.length === 0) {
      console.log("Chưa có customer nào. Hãy đăng ký trước ở /register.")
      return
    }
    const user = users.rows[0]
    const bookings = await pool.query("SELECT id, booking_code, status FROM bookings WHERE user_id=$1 ORDER BY id DESC", [user.id])
    console.log("✅ Lịch sử đặt phòng theo userId đã sẵn sàng!")
    console.log("Customer:", user.full_name, "-", user.email, "- ID:", user.id)
    console.log("Số đơn:", bookings.rows.length)
    console.log("Endpoint:", `/api/bookings/customer/${user.id}`)
  } catch (error) {
    console.error("❌ Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}
main()
