import dotenv from "dotenv"
import app from "./app.js"
import authRoutes from "./routes/authRoutes.js"
import favoriteRoutes from "./routes/favoriteRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`CampVibe backend is running at http://localhost:${PORT}`)
})
app.use("/api/auth", authRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/favorites", favoriteRoutes)
app.use("/api", paymentRoutes)