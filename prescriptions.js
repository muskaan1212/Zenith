// Prescriptions Management

const API_BASE_URL = "http://localhost:3001/api"

// Mock prescriptions data
const mockPrescriptions = {
  active: [
    {
      id: 1,
      medication: "Aspirin",
      dosage: "100mg",
      frequency: "Once daily",
      prescribedBy: "Dr. A. Sharma",
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      refillsRemaining: 2,
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. P. Gupta",
      startDate: "2025-09-15",
      endDate: "2026-03-15",
      refillsRemaining: 5,
    },
  ],
  completed: [
    {
      id: 3,
      medication: "Amoxicillin",
      dosage: "250mg",
      frequency: "Three times daily",
      prescribedBy: "Dr. R. Mehta",
      startDate: "2025-09-01",
      endDate: "2025-09-14",
    },
  ],
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadPrescriptions()
  setupTabListeners()
})

function setupTabListeners() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))

      e.target.classList.add("active")
      const tabId = e.target.dataset.tab + "-tab"
      document.getElementById(tabId).classList.add("active")
    })
  })
}

function loadPrescriptions() {
  displayPrescriptions("active", mockPrescriptions.active)
  displayPrescriptions("completed", mockPrescriptions.completed)
  displayPrescriptions("refill", [])
}

function displayPrescriptions(type, prescriptions) {
  const container = document.getElementById(`${type}-prescriptions`)

  if (prescriptions.length === 0) {
    container.innerHTML = '<p class="empty-state">No prescriptions found.</p>'
    return
  }

  container.innerHTML = prescriptions
    .map(
      (rx) => `
    <div class="prescription-card">
      <div class="prescription-header">
        <div>
          <div class="medication-name">${rx.medication}</div>
          <div class="appointment-specialty">${rx.prescribedBy}</div>
        </div>
        ${type === "active" ? `<span class="appointment-status status-upcoming">Active</span>` : ""}
      </div>
      <div class="prescription-details">
        <div class="detail-item">
          <span class="detail-label">Dosage</span>
          <span class="detail-value">${rx.dosage}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Frequency</span>
          <span class="detail-value">${rx.frequency}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Start Date</span>
          <span class="detail-value">${new Date(rx.startDate).toLocaleDateString()}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">End Date</span>
          <span class="detail-value">${new Date(rx.endDate).toLocaleDateString()}</span>
        </div>
        ${
          rx.refillsRemaining !== undefined
            ? `
        <div class="detail-item">
          <span class="detail-label">Refills Remaining</span>
          <span class="detail-value">${rx.refillsRemaining}</span>
        </div>
        `
            : ""
        }
      </div>
      <div class="prescription-actions">
        ${
          type === "active" && rx.refillsRemaining > 0
            ? `
          <button class="btn-primary btn-small" onclick="requestRefill(${rx.id})">Request Refill</button>
        `
            : ""
        }
        <button class="btn-secondary btn-small" onclick="downloadPrescription(${rx.id})">Download</button>
      </div>
    </div>
  `,
    )
    .join("")
}

function requestRefill(id) {
  alert("Refill request submitted! You will receive it within 2-3 business days.")
}

function downloadPrescription(id) {
  alert("Prescription downloaded successfully!")
}
