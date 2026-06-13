import express from "express"
import cors from "cors"

import healthRoutes from "./routes/healthRoutes.js"
import placeRoutes from "./routes/placeRoutes.js"
import experienceRoutes from "./routes/experienceRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js"
import favoriteRoutes from "./routes/favoriteRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

const app = express()


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampVibe API is running",
    health: "/api/health",
  })
})

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}))

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true)
      }

      return callback(new Error("CORS policy: Origin not allowed"))
    },
    credentials: true,
  })
)

app.use(express.json())

app.use("/api/health", healthRoutes)
app.use("/api/places", placeRoutes)
app.use("/api/experiences", experienceRoutes)
app.use("/api/blog-posts", blogRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/favorites", favoriteRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/auth", authRoutes)

app.use("/api", paymentRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
