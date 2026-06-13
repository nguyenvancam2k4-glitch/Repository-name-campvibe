import { Router } from "express"
import {
  adminLogin,
  customerLogin,
  getAdminProfile,
  registerCustomer,
} from "../controllers/authController.js"

const router = Router()

router.post("/register", registerCustomer)
router.post("/login", customerLogin)
router.post("/admin-login", adminLogin)
router.get("/admin-profile", getAdminProfile)

export default router
