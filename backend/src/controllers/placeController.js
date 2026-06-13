import { findAllPlaces, findPlaceById } from "../models/placeModel.js"

export async function getPlaces(req, res, next) {
  try {
    const places = await findAllPlaces()

    res.json({
      success: true,
      source: "postgresql",
      count: places.length,
      data: places,
    })
  } catch (error) {
    next(error)
  }
}

export async function getPlaceById(req, res, next) {
  try {
    const { id } = req.params
    const place = await findPlaceById(id)

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy địa điểm",
      })
    }

    res.json({
      success: true,
      source: "postgresql",
      data: place,
    })
  } catch (error) {
    next(error)
  }
}
