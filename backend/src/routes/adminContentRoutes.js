import { Router } from "express"
import {
  createAdminBlogPost,
  createAdminExperience,
  createAdminPlace,
  getAdminContent,
  updateAdminBlogPost,
  updateAdminBlogPostStatus,
  updateAdminExperience,
  updateAdminExperienceStatus,
  updateAdminPlace,
  updateAdminPlaceStatus,
  updateAdminUserStatus,
} from "../controllers/adminContentController.js"

const router = Router()

router.get("/content", getAdminContent)

router.post("/places", createAdminPlace)
router.patch("/places/:id", updateAdminPlace)
router.patch("/places/:id/status", updateAdminPlaceStatus)

router.post("/experiences", createAdminExperience)
router.patch("/experiences/:id", updateAdminExperience)
router.patch("/experiences/:id/status", updateAdminExperienceStatus)

router.post("/blog-posts", createAdminBlogPost)
router.patch("/blog-posts/:id", updateAdminBlogPost)
router.patch("/blog-posts/:id/status", updateAdminBlogPostStatus)

router.patch("/users/:id/status", updateAdminUserStatus)

export default router
