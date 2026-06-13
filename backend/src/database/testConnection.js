import dotenv from "dotenv"
import { pool, testDatabaseConnection } from "../config/db.js"

dotenv.config()

async function main() {
  try {
    const result = await testDatabaseConnection()

    console.log("✅ Kết nối PostgreSQL thành công!")
    console.log("Thời gian database:", result.current_time)
  } catch (error) {
    console.error("❌ Kết nối PostgreSQL thất bại!")
    console.error("Lỗi:", error.message)
    console.error("")
    console.error("Gợi ý kiểm tra:")
    console.error("1. PostgreSQL đã bật chưa?")
    console.error("2. File .env đã đúng DB_NAME, DB_USER, DB_PASSWORD chưa?")
    console.error("3. Database campvibe_db đã được tạo chưa?")
  } finally {
    await pool.end()
  }
}

main()
