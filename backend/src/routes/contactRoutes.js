import { Router } from "express"
import {
  createContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contactController.js"

const router = Router()

router.get("/", getContacts)
router.post("/", createContact)
router.patch("/:id/status", updateContactStatus)

export default router
