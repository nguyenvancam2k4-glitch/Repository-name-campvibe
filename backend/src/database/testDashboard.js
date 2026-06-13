import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    const bookings = await pool.query("SELECT COUNT(*)::int AS total FROM bookings")
    const contacts = await pool.query("SELECT COUNT(*)::int AS total FROM contact_messages")
    const customers = await pool.query("SELECT COUNT(*)::int AS total FROM users WHERE role='customer'")

    console.log("✅ Dashboard admin đã sẵn sàng!")
    console.log("Tổng đơn:", bookings.rows[0].total)
    console.log("Tổng liên hệ:", contacts.rows[0].total)
    console.log("Tổng khách hàng:", customers.rows[0].total)
    console.log("Endpoint:", "/api/dashboard/admin")
  } catch (error) {
    console.error("❌ Kiểm tra dashboard thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
