// API Client for JSON Server Integration
// Handles all Fetch API calls and REST operations

const API_BASE_URL = "http://localhost:3001"

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }

  // Generic fetch method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const config = { ...defaultOptions, ...options }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("API Error:", error)
      return { success: false, error: error.message }
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  // POST request
  async post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  // PUT request
  async put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }

  // Reminders endpoints
  async getReminders() {
    return this.get("/reminders")
  }

  async createReminder(reminder) {
    return this.post("/reminders", reminder)
  }

  async updateReminder(id, reminder) {
    return this.put(`/reminders/${id}`, reminder)
  }

  async deleteReminder(id) {
    return this.delete(`/reminders/${id}`)
  }

  // Consultations endpoints
  async getConsultations() {
    return this.get("/consultations")
  }

  async createConsultation(consultation) {
    return this.post("/consultations", consultation)
  }

  // User endpoints
  async getUser(id) {
    return this.get(`/users/${id}`)
  }

  async updateUser(id, user) {
    return this.put(`/users/${id}`, user)
  }
}

// Create global API client instance
const apiClient = new APIClient()
