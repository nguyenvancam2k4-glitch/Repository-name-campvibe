import dotenv from "dotenv"
import { pool } from "../config/db.js"
import { findAllBlogPosts, findBlogPostById } from "../models/blogModel.js"

dotenv.config()

async function main() {
  try {
    const posts = await findAllBlogPosts()
    const firstPost = await findBlogPostById(1)

    console.log("✅ Lấy bài viết từ PostgreSQL thành công!")
    console.log("Số bài viết:", posts.length)
    console.log("Bài viết đầu tiên:", firstPost?.title)
    console.log("Nguồn dữ liệu: PostgreSQL")
  } catch (error) {
    console.error("❌ Lấy bài viết từ PostgreSQL thất bại!")
    console.error("Lỗi:", error.message)
  } finally {
    await pool.end()
  }
}

main()
