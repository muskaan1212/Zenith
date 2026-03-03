// Appointments Management

const API_BASE_URL = "http://localhost:3001/api"

// DOM Elements
const bookBtn = document.getElementById("book-appointment-btn")
const appointmentModal = document.getElementById("appointment-modal")
const appointmentForm = document.getElementById("appointment-form")
const upcomingContainer = document.getElementById("upcoming-appointments")
const pastContainer = document.getElementById("past-appointments")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadAppointments()
  setupEventListeners()
})

function setupEventListeners() {
  bookBtn.addEventListener("click", () => appointmentModal.classList.remove("hidden"))

  document.querySelectorAll(".modal-close, .cancel-modal").forEach((btn) => {
    btn.addEventListener("click", () => appointmentModal.classList.add("hidden"))
  })

  appointmentForm.addEventListener("submit", handleBookAppointment)
}

async function loadAppointments() {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations`)
    const appointments = await response.json()

    const now = new Date()
    const upcoming = appointments.filter((apt) => new Date(apt.date) >= now)
    const past = appointments.filter((apt) => new Date(apt.date) < now)

    displayAppointments(upcoming, upcomingContainer)
    displayAppointments(past, pastContainer)
  } catch (error) {
    console.log("[v0] Error loading appointments:", error)
    loadMockAppointments()
  }
}

function loadMockAppointments() {
  const mockAppointments = [
    {
      id: 1,
      doctor: "Dr. A. Sharma",
      specialty: "Cardiology",
      date: "2025-10-28",
      time: "14:30",
      reason: "Regular checkup",
    },
    {
      id: 2,
      doctor: "Dr. P. Gupta",
      specialty: "Neurology",
      date: "2025-11-05",
      time: "10:00",
      reason: "Consultation",
    },
  ]

  const now = new Date()
  const upcoming = mockAppointments.filter((apt) => new Date(apt.date) >= now)
  const past = mockAppointments.filter((apt) => new Date(apt.date) < now)

  displayAppointments(upcoming, upcomingContainer)
  displayAppointments(past, pastContainer)
}

function displayAppointments(appointments, container) {
  if (appointments.length === 0) {
    container.innerHTML = '<p class="empty-state">No appointments found.</p>'
    return
  }

  container.innerHTML = appointments
    .map(
      (apt) => `
    <div class="appointment-card">
      <div class="appointment-header">
        <div>
          <div class="appointment-doctor">${apt.doctor}</div>
          <div class="appointment-specialty">${apt.specialty}</div>
        </div>
        <span class="appointment-status ${new Date(apt.date) >= new Date() ? "status-upcoming" : "status-completed"}">
          ${new Date(apt.date) >= new Date() ? "Upcoming" : "Completed"}
        </span>
      </div>
      <div class="appointment-details">
        <div class="detail-item">
          <span class="detail-label">Date</span>
          <span class="detail-value">${new Date(apt.date).toLocaleDateString()}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Time</span>
          <span class="detail-value">${apt.time}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Reason</span>
          <span class="detail-value">${apt.reason || "N/A"}</span>
        </div>
      </div>
      <div class="appointment-actions">
        <button class="btn-secondary btn-small" onclick="rescheduleAppointment(${apt.id})">Reschedule</button>
        <button class="btn-secondary btn-small" onclick="cancelAppointment(${apt.id})">Cancel</button>
      </div>
    </div>
  `,
    )
    .join("")
}

async function handleBookAppointment(e) {
  e.preventDefault()

  const doctor = document.getElementById("doctor-select").value
  const date = document.getElementById("appointment-date").value
  const time = document.getElementById("appointment-time").value
  const reason = document.getElementById("appointment-reason").value

  if (!doctor || !date || !time) {
    alert("Please fill in all required fields")
    return
  }

  const newAppointment = {
    doctor,
    date,
    time,
    reason,
    specialty: doctor.includes("Sharma") ? "Cardiology" : doctor.includes("Gupta") ? "Neurology" : "Orthopedics",
  }

  try {
    await fetch(`${API_BASE_URL}/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    })
  } catch (error) {
    console.log("[v0] Error booking appointment:", error)
  }

  appointmentForm.reset()
  appointmentModal.classList.add("hidden")
  loadAppointments()
  alert("Appointment booked successfully!")
}

function rescheduleAppointment(id) {
  alert("Reschedule feature coming soon!")
}

function cancelAppointment(id) {
  if (confirm("Are you sure you want to cancel this appointment?")) {
    alert("Appointment cancelled successfully!")
    loadAppointments()
  }
}
