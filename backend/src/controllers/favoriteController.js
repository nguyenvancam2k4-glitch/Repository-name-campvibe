import {
  addFavorite,
  findFavorite,
  findFavoritesByUserId,
  removeFavorite,
} from "../models/favoriteModel.js"

export async function getUserFavorites(req, res, next) {
  try {
    const { userId } = req.params
    const favorites = await findFavoritesByUserId(userId)

    res.json({
      success: true,
      source: "postgresql",
      count: favorites.length,
      data: favorites,
    })
  } catch (error) {
    next(error)
  }
}

export async function checkFavorite(req, res, next) {
  try {
    const { userId, placeId } = req.params
    const favorite = await findFavorite(userId, placeId)

    res.json({
      success: true,
      source: "postgresql",
      isFavorite: Boolean(favorite),
      data: favorite,
    })
  } catch (error) {
    next(error)
  }
}

export async function createFavorite(req, res, next) {
  try {
    const { userId, placeId } = req.body

    if (!userId || !placeId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId hoặc placeId",
      })
    }

    const favorite = await addFavorite(userId, placeId)

    res.status(201).json({
      success: true,
      source: "postgresql",
      message: "Đã thêm địa điểm vào yêu thích",
      data: favorite,
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteFavorite(req, res, next) {
  try {
    const { userId, placeId } = req.params
    const favorite = await removeFavorite(userId, placeId)

    res.json({
      success: true,
      source: "postgresql",
      message: favorite ? "Đã xóa khỏi yêu thích" : "Địa điểm chưa có trong yêu thích",
      data: favorite,
    })
  } catch (error) {
    next(error)
  }
}
