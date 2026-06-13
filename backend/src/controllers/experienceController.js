import { findAllExperiences } from "../models/experienceModel.js"

export async function getExperiences(req, res, next) {
  try {
    const experiences = await findAllExperiences()

    res.json({
      success: true,
      source: "postgresql",
      count: experiences.length,
      data: experiences,
    })
  } catch (error) {
    next(error)
  }
}
