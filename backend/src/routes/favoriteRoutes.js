import { Router } from "express"
import {
  checkFavorite,
  createFavorite,
  deleteFavorite,
  getUserFavorites,
} from "../controllers/favoriteController.js"

const router = Router()

router.get("/user/:userId", getUserFavorites)
router.get("/user/:userId/place/:placeId", checkFavorite)
router.post("/", createFavorite)
router.delete("/user/:userId/place/:placeId", deleteFavorite)

export default router
