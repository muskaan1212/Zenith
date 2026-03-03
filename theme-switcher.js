// Theme Switcher Module
// Handles light/dark mode toggle with localStorage persistence

class ThemeSwitcher {
  constructor() {
    this.STORAGE_KEY = "zenith-theme"
    this.DARK_MODE_CLASS = "dark-mode"
    this.init()
  }

  init() {
    // Load saved theme preference
    const savedTheme = this.getSavedTheme()
    if (savedTheme === "dark") {
      this.enableDarkMode()
    } else {
      this.enableLightMode()
    }

    // Setup theme toggle button
    this.setupToggleButton()
  }

  // Get saved theme from localStorage
  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || "light"
  }

  // Save theme to localStorage
  saveTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme)
  }

  // Enable dark mode
  enableDarkMode() {
    document.body.classList.add(this.DARK_MODE_CLASS)
    this.saveTheme("dark")
    this.updateToggleButton("☀️")
  }

  // Enable light mode
  enableLightMode() {
    document.body.classList.remove(this.DARK_MODE_CLASS)
    this.saveTheme("light")
    this.updateToggleButton("🌙")
  }

  // Toggle theme
  toggleTheme() {
    const currentTheme = this.getSavedTheme()
    if (currentTheme === "light") {
      this.enableDarkMode()
    } else {
      this.enableLightMode()
    }
  }

  // Update toggle button text
  updateToggleButton(emoji) {
    const toggleBtn = document.getElementById("theme-toggle")
    if (toggleBtn) {
      toggleBtn.textContent = emoji
    }
  }

  // Setup toggle button event listener
  setupToggleButton() {
    const toggleBtn = document.getElementById("theme-toggle")
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// Initialize theme switcher when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ThemeSwitcher()
})
