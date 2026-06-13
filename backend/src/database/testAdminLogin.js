import dotenv from "dotenv"
import { pool } from "../config/db.js"
import { findUserByEmail } from "../models/authModel.js"

dotenv.config()

async function main() {
  try {
    const admin = await findUserByEmail("admin@campvibe.vn")

    if (!admin) {
      throw new Error("Không tìm thấy admin@campvibe.vn trong bảng users")
    }

    if (admin.role !== "admin") {
      throw new Error("Tài khoản admin@campvibe.vn chưa có role admin")
    }

    console.log("✅ Tài khoản admin trong PostgreSQL đã sẵn sàng!")
    console.log("Email:", admin.email)
    console.log("Role:", admin.role)
    console.log("Mật khẩu demo:", "campvibe2026")
  } catch (error) {
    console.error("❌ Kiểm tra admin thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
