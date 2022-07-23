const errorMiddleware = (err, _req, res, _next) => res.status(err.status)
.json({ message: err.message, code: err.status });

module.exports = errorMiddleware;
