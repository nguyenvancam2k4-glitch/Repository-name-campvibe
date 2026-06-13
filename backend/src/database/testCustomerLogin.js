import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    const result = await pool.query(`
      SELECT id, full_name, email, role, status
      FROM users
      WHERE role = 'customer'
      ORDER BY id DESC
      LIMIT 5
    `)

    console.log("✅ API đăng nhập customer đã sẵn sàng!")
    console.log("Số tài khoản customer tìm thấy:", result.rows.length)

    if (result.rows[0]) {
      console.log("Customer mới nhất:", result.rows[0].email)
      console.log("Role:", result.rows[0].role)
      console.log("Status:", result.rows[0].status)
    } else {
      console.log("Bạn cần đăng ký một tài khoản customer ở /register trước khi test đăng nhập.")
    }
  } catch (error) {
    console.error("❌ Kiểm tra customer thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
