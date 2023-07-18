import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use('/api', router)
app.use(errorMiddleware)

const launchApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`Server launched on port ${PORT}`))
  } catch (e) {
    console.log(e.message)
  }
}
launchApp()
