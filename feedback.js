// Feedback & Ratings System

const API_BASE_URL = "http://localhost:3001/api"

// Mock feedback data
const mockFeedback = [
  {
    id: 1,
    author: "Sarah Johnson",
    type: "doctor",
    rating: 5,
    subject: "Excellent Service",
    message: "Dr. Sharma provided excellent care and was very attentive to my concerns.",
    date: "2025-10-20",
  },
  {
    id: 2,
    author: "Michael Chen",
    type: "service",
    rating: 4,
    subject: "Good Experience",
    message: "Overall good experience, but the waiting time could be reduced.",
    date: "2025-10-18",
  },
]

// DOM Elements
const submitFeedbackBtn = document.getElementById("submit-feedback-btn")
const feedbackModal = document.getElementById("feedback-modal")
const feedbackForm = document.getElementById("feedback-form")
const feedbackList = document.getElementById("feedback-list")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  displayFeedback()
  setupEventListeners()
})

function setupEventListeners() {
  submitFeedbackBtn.addEventListener("click", () => feedbackModal.classList.remove("hidden"))

  document.querySelectorAll(".modal-close, .cancel-modal").forEach((btn) => {
    btn.addEventListener("click", () => feedbackModal.classList.add("hidden"))
  })

  feedbackForm.addEventListener("submit", handleSubmitFeedback)
}

function displayFeedback() {
  if (mockFeedback.length === 0) {
    feedbackList.innerHTML = '<p class="empty-state">No feedback yet. Be the first to share!</p>'
    return
  }

  feedbackList.innerHTML = mockFeedback
    .map(
      (feedback) => `
    <div class="feedback-card">
      <div class="feedback-header">
        <div>
          <div class="feedback-author">${feedback.author}</div>
          <div class="feedback-subject">${feedback.subject}</div>
        </div>
        <div class="feedback-rating">${"★".repeat(feedback.rating)}</div>
      </div>
      <p class="feedback-message">${feedback.message}</p>
      <div class="feedback-date">${new Date(feedback.date).toLocaleDateString()}</div>
    </div>
  `,
    )
    .join("")
}

function handleSubmitFeedback(e) {
  e.preventDefault()

  const type = document.getElementById("feedback-type").value
  const rating = document.querySelector('input[name="rating"]:checked')?.value
  const subject = document.getElementById("feedback-subject").value
  const message = document.getElementById("feedback-message").value

  if (!type || !rating || !subject || !message) {
    alert("Please fill in all required fields")
    return
  }

  const newFeedback = {
    id: mockFeedback.length + 1,
    author: "You",
    type,
    rating: Number.parseInt(rating),
    subject,
    message,
    date: new Date().toISOString().split("T")[0],
  }

  mockFeedback.unshift(newFeedback)
  displayFeedback()

  feedbackForm.reset()
  feedbackModal.classList.add("hidden")
  alert("Thank you for your feedback!")
}
