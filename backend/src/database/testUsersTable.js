import dotenv from "dotenv"
import { pool } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `)

    if (result.rows.length === 0) {
      throw new Error("Chưa tìm thấy bảng users")
    }

    console.log("✅ Bảng users trong PostgreSQL đã sẵn sàng!")
    console.log("Các cột:", result.rows.map((row) => row.column_name).join(", "))
    console.log("Có thể đăng ký tài khoản customer qua POST /api/auth/register")
  } catch (error) {
    console.error("❌ Kiểm tra bảng users thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
