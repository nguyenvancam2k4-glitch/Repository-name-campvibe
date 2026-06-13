export function checkHealth(req, res) {
  res.json({
    success: true,
    message: "CampVibe backend API is running",
    timestamp: new Date().toISOString(),
  })
}
