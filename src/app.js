import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import './config/db.js'
import { errorHandler, notFound } from './middleware/errors.js'
import apiRouter from './routes/index.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

// health
app.get('/health', (req, res) => res.json({ status: 'ok', message: 'API running' }))

// demo login endpoint
app.post('/login', (req, res) => {
  const { userid, password } = req.body || {}
  // basic validations
  if (!userid || !password) {
    return res.status(400).json({ ok: false, error: 'userid and password are required' })
  }
  if (userid.length < 3) {
    return res.status(400).json({ ok: false, error: 'userid must be at least 3 characters' })
  }
  if (password.length < 6) {
    return res.status(400).json({ ok: false, error: 'password must be at least 6 characters' })
  }

  // check vs .env
  const ok = userid === process.env.DEMO_USER && password === process.env.DEMO_PASS
  if (!ok) return res.status(401).json({ ok: false, error: 'invalid credentials' })

  return res.json({ ok: true, message: 'login successful' })
})

// mount your API under /api/v1
app.use('/api/v1', apiRouter)

// 404 + error handler
app.use(notFound)
app.use(errorHandler)

export default app
