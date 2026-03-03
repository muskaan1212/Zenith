/**
 * Zenith Healthcare — API client
 * Calls Express backend on http://localhost:5000
 * Falls back gracefully if backend is offline.
 */

const BASE_URL = 'http://localhost:5000'

// GET /appointments
export async function getAppointments() {
  const res = await fetch(`${BASE_URL}/appointments`)
  if (!res.ok) throw new Error('Failed to fetch appointments')
  return res.json()
}

// POST /appointments
export async function createAppointment(data) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create appointment')
  return res.json()
}

// GET /records
export async function getRecords() {
  const res = await fetch(`${BASE_URL}/records`)
  if (!res.ok) throw new Error('Failed to fetch records')
  return res.json()
}

// POST /records (file upload)
export async function uploadRecord(formData) {
  const res = await fetch(`${BASE_URL}/records`, {
    method: 'POST',
    body: formData, // multipart/form-data — do NOT set Content-Type manually
  })
  if (!res.ok) throw new Error('Failed to upload record')
  return res.json()
}

// Stream / download a record file
export function getRecordStreamUrl(filename) {
  return `${BASE_URL}/records/${filename}`
}

// POST /feedback
export async function submitFeedback(data) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit feedback')
  return res.json()
}

// GET /feedback
export async function getFeedback() {
  const res = await fetch(`${BASE_URL}/feedback`)
  if (!res.ok) throw new Error('Failed to fetch feedback')
  return res.json()
}
