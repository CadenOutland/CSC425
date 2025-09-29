export function notFound(req, res, next) {
  const err = new Error(`Not Found - ${req.originalUrl}`)
  err.status = 404
  next(err)
}

export function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    error: { message: err.message || 'Server error', code: err.status || 500 }
  })
}

