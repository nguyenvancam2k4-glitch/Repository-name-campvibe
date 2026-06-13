import { Router } from "express"
import {
  createBooking,
  getBookingById,
  getBookings,
  getCustomerBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js"

const router = Router()

router.get("/", getBookings)
router.get("/customer/:userId", getCustomerBookings)
router.get("/:id", getBookingById)
router.post("/", createBooking)
router.patch("/:id/status", updateBookingStatus)

export default router
