const express = require('express')
const path = require('path')
const fs = require('fs')
const appointmentsRouter = require('./routes/appointments')
const recordsRouter = require('./routes/records')
const feedbackRouter = require('./routes/feedback')

const app = express()
const PORT = 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS headers (allow Next.js frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// Serve static files from server/public
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/appointments', appointmentsRouter)
app.use('/records', recordsRouter)
app.use('/feedback', feedbackRouter)

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Zenith Healthcare API running', port: PORT })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Zenith Healthcare backend running on http://localhost:${PORT}`)
})
