import { Router } from "express"
import { changePassword, deactivateAccount, updateProfile } from "../controllers/accountController.js"

const router = Router()

router.patch("/users/:id/profile", updateProfile)
router.patch("/users/:id/password", changePassword)
router.patch("/users/:id/deactivate", deactivateAccount)

export default router
