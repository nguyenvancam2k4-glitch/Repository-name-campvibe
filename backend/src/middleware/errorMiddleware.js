export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: "API endpoint không tồn tại",
    path: req.originalUrl,
  })
}

export function errorHandler(err, req, res, next) {
  console.error(err)

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Lỗi server",
  })
}
