import { Router } from "express"
import { getBlogPostById, getBlogPosts } from "../controllers/blogController.js"

const router = Router()

router.get("/", getBlogPosts)
router.get("/:id", getBlogPostById)

export default router
