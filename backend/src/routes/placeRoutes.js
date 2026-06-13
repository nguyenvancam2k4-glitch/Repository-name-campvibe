import { Router } from "express"
import { getPlaceById, getPlaces } from "../controllers/placeController.js"

const router = Router()

router.get("/", getPlaces)
router.get("/:id", getPlaceById)

export default router
