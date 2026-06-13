import { findAllBlogPosts, findBlogPostById } from "../models/blogModel.js"

export async function getBlogPosts(req, res, next) {
  try {
    const posts = await findAllBlogPosts()

    res.json({
      success: true,
      source: "postgresql",
      count: posts.length,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

export async function getBlogPostById(req, res, next) {
  try {
    const { id } = req.params
    const post = await findBlogPostById(id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      })
    }

    res.json({
      success: true,
      source: "postgresql",
      data: post,
    })
  } catch (error) {
    next(error)
  }
}
