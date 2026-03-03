// Login Module
// Handles user authentication and login form

class LoginManager {
  constructor() {
    this.setupLoginForm()
  }

  setupLoginForm() {
    const loginForm = document.querySelector(".auth-form")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e))
    }
  }

  handleLogin(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const validator = new FormValidator()
    const formData = { email, password }

    if (!validator.validateLoginForm(formData)) {
      const errors = validator.getErrors()
      alert("Validation errors:\n" + Object.values(errors).join("\n"))
      return
    }

    // Mock authentication (in real app, this would call an API)
    const user = {
      id: 1,
      name: email.split("@")[0],
      email: email,
    }

    // Save user to localStorage
    localStorage.setItem("zenith-user", JSON.stringify(user))

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  }
}

// FormValidator class declaration
class FormValidator {
  validateLoginForm(formData) {
    const errors = {}
    if (!formData.email) {
      errors.email = "Email is required"
    }
    if (!formData.password) {
      errors.password = "Password is required"
    }
    if (Object.keys(errors).length > 0) {
      this.errors = errors
      return false
    }
    return true
  }

  getErrors() {
    return this.errors || {}
  }
}

// Initialize login manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new LoginManager()
})
