document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]')
  const sections = document.querySelectorAll("section[id]")

  // Function to update active nav link
  function updateActiveNav() {
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("nav-active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("nav-active")
      }
    })
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveNav)

  // Initial call
  updateActiveNav()

  // Smooth scroll handling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
          // Update active state immediately
          setTimeout(updateActiveNav, 100)
        }
      }
    })
  })
})
