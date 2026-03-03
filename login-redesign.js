import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from "./firebase-config.js"

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const passwordToggle = document.querySelector(".password-toggle")
  const rememberCheckbox = document.querySelector('input[name="remember"]')
  const googleBtn = document.getElementById("google-signin-btn")

  // Password visibility toggle
  if (passwordToggle) {
    passwordToggle.addEventListener("click", (e) => {
      e.preventDefault()
      const isPassword = passwordInput.type === "password"
      passwordInput.type = isPassword ? "text" : "password"
      passwordToggle.textContent = isPassword ? "🙈" : "👁️"
    })
  }

  // Form validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePassword(password) {
    return password.length >= 6
  }

  function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`)
    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.add("show")
      input.style.borderColor = "#d32f2f"
    }
  }

  function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`)
    if (errorElement) {
      errorElement.textContent = ""
      errorElement.classList.remove("show")
      input.style.borderColor = ""
    }
  }

  // Real-time validation
  emailInput.addEventListener("blur", () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address")
    } else {
      clearError(emailInput)
    }
  })

  passwordInput.addEventListener("blur", () => {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
      showError(passwordInput, "Password must be at least 6 characters")
    } else {
      clearError(passwordInput)
    }
  })

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    let isValid = true

    // Validate email
    if (!emailInput.value) {
      showError(emailInput, "Email is required")
      isValid = false
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address")
      isValid = false
    } else {
      clearError(emailInput)
    }

    // Validate password
    if (!passwordInput.value) {
      showError(passwordInput, "Password is required")
      isValid = false
    } else if (!validatePassword(passwordInput.value)) {
      showError(passwordInput, "Password must be at least 6 characters")
      isValid = false
    } else {
      clearError(passwordInput)
    }

    if (isValid) {
      const button = loginForm.querySelector('button[type="submit"]')
      const originalText = button.textContent
      button.textContent = "Signing in..."
      button.disabled = true

      try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)

        // Save remember me preference
        if (rememberCheckbox.checked) {
          localStorage.setItem("rememberEmail", emailInput.value)
        } else {
          localStorage.removeItem("rememberEmail")
        }

        // Store user data and redirect to dashboard
        localStorage.setItem("userEmail", emailInput.value)
        localStorage.setItem("isLoggedIn", "true")

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1000)
      } catch (error) {
        button.textContent = originalText
        button.disabled = false

        // Handle Firebase errors
        if (error.code === "auth/user-not-found") {
          showError(emailInput, "No account found with this email")
        } else if (error.code === "auth/wrong-password") {
          showError(passwordInput, "Incorrect password")
        } else if (error.code === "auth/invalid-email") {
          showError(emailInput, "Invalid email address")
        } else {
          showError(emailInput, error.message)
        }
      }
    }
  })

  if (googleBtn) {
    googleBtn.addEventListener("click", async (e) => {
      e.preventDefault()
      googleBtn.textContent = "Signing in..."
      googleBtn.disabled = true

      try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        // Store user data
        localStorage.setItem("userEmail", user.email)
        localStorage.setItem("userName", user.displayName)
        localStorage.setItem("isLoggedIn", "true")

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1000)
      } catch (error) {
        googleBtn.textContent = "Continue with Google"
        googleBtn.disabled = false

        if (error.code !== "auth/popup-closed-by-user") {
          alert("Google Sign-In failed: " + error.message)
        }
      }
    })
  }

  // Load remembered email
  const rememberedEmail = localStorage.getItem("rememberEmail")
  if (rememberedEmail) {
    emailInput.value = rememberedEmail
    rememberCheckbox.checked = true
  }
})
