// Mobile hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu")
  const navDrawer = document.getElementById("nav-drawer")

  if (!hamburgerMenu || !navDrawer) return

  // Toggle menu on hamburger click
  hamburgerMenu.addEventListener("click", () => {
    const isActive = hamburgerMenu.classList.toggle("active")
    navDrawer.classList.toggle("active")
    hamburgerMenu.setAttribute("aria-expanded", isActive)
  })

  // Close menu when a link is clicked
  const navLinks = navDrawer.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active")
      navDrawer.classList.remove("active")
      hamburgerMenu.setAttribute("aria-expanded", "false")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburgerMenu.contains(e.target) && !navDrawer.contains(e.target)) {
      hamburgerMenu.classList.remove("active")
      navDrawer.classList.remove("active")
      hamburgerMenu.setAttribute("aria-expanded", "false")
    }
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hamburgerMenu.classList.remove("active")
      navDrawer.classList.remove("active")
      hamburgerMenu.setAttribute("aria-expanded", "false")
    }
  })

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      const dropdown = toggle.closest(".nav-dropdown")
      const menu = dropdown.querySelector(".dropdown-menu")

      // Close other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((m) => {
        if (m !== menu) {
          m.style.opacity = "0"
          m.style.visibility = "hidden"
        }
      })

      // Toggle current dropdown
      const isOpen = menu.style.opacity === "1"
      menu.style.opacity = isOpen ? "0" : "1"
      menu.style.visibility = isOpen ? "hidden" : "visible"
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.opacity = "0"
        menu.style.visibility = "hidden"
      })
    }
  })
})
