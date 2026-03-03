// Profile Management

const API_BASE_URL = "http://localhost:3001/api"

// DOM Elements
const editPersonalBtn = document.getElementById("edit-personal-btn")
const editHealthBtn = document.getElementById("edit-health-btn")
const personalForm = document.getElementById("personal-form")
const healthForm = document.getElementById("health-form")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProfile()
  setupEventListeners()
})

function setupEventListeners() {
  editPersonalBtn.addEventListener("click", togglePersonalForm)
  editHealthBtn.addEventListener("click", toggleHealthForm)

  personalForm.addEventListener("submit", handleSavePersonal)
  healthForm.addEventListener("submit", handleSaveHealth)

  document.querySelectorAll(".cancel-edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest("form").classList.add("hidden")
      e.target.closest("form").previousElementSibling.classList.remove("hidden")
    })
  })
}

function loadProfile() {
  const savedProfile = localStorage.getItem("userProfile")
  if (savedProfile) {
    const profile = JSON.parse(savedProfile)
    displayProfile(profile)
  }
}

function displayProfile(profile) {
  document.getElementById("display-name").textContent = profile.name || "John Doe"
  document.getElementById("display-email").textContent = profile.email || "john@example.com"
  document.getElementById("display-phone").textContent = profile.phone || "+1 (555) 123-4567"
  document.getElementById("display-dob").textContent = profile.dob || "January 15, 1990"

  document.getElementById("display-blood").textContent = profile.blood || "O+"
  document.getElementById("display-height").textContent = profile.height || "5'10\""
  document.getElementById("display-weight").textContent = profile.weight || "75 kg"
  document.getElementById("display-allergies").textContent = profile.allergies || "None"
}

function togglePersonalForm() {
  const display = document.getElementById("personal-info")
  const form = personalForm

  display.classList.toggle("hidden")
  form.classList.toggle("hidden")

  if (!form.classList.contains("hidden")) {
    document.getElementById("edit-name").value = document.getElementById("display-name").textContent
    document.getElementById("edit-email").value = document.getElementById("display-email").textContent
    document.getElementById("edit-phone").value = document.getElementById("display-phone").textContent
    document.getElementById("edit-dob").value = document.getElementById("display-dob").textContent
  }
}

function toggleHealthForm() {
  const display = document.getElementById("health-info")
  const form = healthForm

  display.classList.toggle("hidden")
  form.classList.toggle("hidden")

  if (!form.classList.contains("hidden")) {
    document.getElementById("edit-blood").value = document.getElementById("display-blood").textContent
    document.getElementById("edit-height").value = document.getElementById("display-height").textContent
    document.getElementById("edit-weight").value = document.getElementById("display-weight").textContent
    document.getElementById("edit-allergies").value = document.getElementById("display-allergies").textContent
  }
}

function handleSavePersonal(e) {
  e.preventDefault()

  const profile = JSON.parse(localStorage.getItem("userProfile") || "{}")
  profile.name = document.getElementById("edit-name").value
  profile.email = document.getElementById("edit-email").value
  profile.phone = document.getElementById("edit-phone").value
  profile.dob = document.getElementById("edit-dob").value

  localStorage.setItem("userProfile", JSON.stringify(profile))
  displayProfile(profile)

  personalForm.classList.add("hidden")
  document.getElementById("personal-info").classList.remove("hidden")
  alert("Personal information updated successfully!")
}

function handleSaveHealth(e) {
  e.preventDefault()

  const profile = JSON.parse(localStorage.getItem("userProfile") || "{}")
  profile.blood = document.getElementById("edit-blood").value
  profile.height = document.getElementById("edit-height").value
  profile.weight = document.getElementById("edit-weight").value
  profile.allergies = document.getElementById("edit-allergies").value

  localStorage.setItem("userProfile", JSON.stringify(profile))
  displayProfile(profile)

  healthForm.classList.add("hidden")
  document.getElementById("health-info").classList.remove("hidden")
  alert("Health information updated successfully!")
}
