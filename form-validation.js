// Form Validation Module
// Handles validation for all forms in the application

class FormValidator {
  constructor() {
    this.errors = {}
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate required field
  validateRequired(value, fieldName) {
    if (!value || value.trim() === "") {
      this.errors[fieldName] = `${fieldName} is required`
      return false
    }
    return true
  }

  // Validate minimum length
  validateMinLength(value, minLength, fieldName) {
    if (value.length < minLength) {
      this.errors[fieldName] = `${fieldName} must be at least ${minLength} characters`
      return false
    }
    return true
  }

  // Validate time format
  validateTime(time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

  // Validate reminder form
  validateReminderForm(formData) {
    this.errors = {}

    this.validateRequired(formData.title, "Reminder Title")
    this.validateRequired(formData.time, "Time")

    if (formData.time && !this.validateTime(formData.time)) {
      this.errors.time = "Please enter a valid time (HH:MM)"
    }

    return Object.keys(this.errors).length === 0
  }

  // Validate login form
  validateLoginForm(formData) {
    this.errors = {}

    this.validateRequired(formData.email, "Email")
    this.validateRequired(formData.password, "Password")

    if (formData.email && !this.validateEmail(formData.email)) {
      this.errors.email = "Please enter a valid email address"
    }

    if (formData.password && !this.validateMinLength(formData.password, 6, "Password")) {
      this.errors.password = "Password must be at least 6 characters"
    }

    return Object.keys(this.errors).length === 0
  }

  // Get all errors
  getErrors() {
    return this.errors
  }

  // Get error message for specific field
  getFieldError(fieldName) {
    return this.errors[fieldName] || null
  }

  // Clear errors
  clearErrors() {
    this.errors = {}
  }
}

// Create global validator instance
const formValidator = new FormValidator()
