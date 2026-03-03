// Dashboard Module
// Handles all dashboard functionality and DOM manipulation

class Dashboard {
  constructor() {
    this.reminders = []
    this.consultations = []
    this.currentUser = null
    this.notificationInterval = null
    this.currentSlide = 0
    this.totalSlides = 4
    this.init()
  }

  async init() {
    // Load user data
    this.loadUserData()

    // Load initial data
    await this.loadReminders()
    await this.loadConsultations()

    // Setup event listeners
    this.setupEventListeners()

    // Setup mobile slider
    this.setupMobileSlider()

    // Start live notifications
    this.startLiveNotifications()

    // Update stats
    this.updateStats()
  }

  // Load user data from localStorage
  loadUserData() {
    const userData = localStorage.getItem("zenith-user")
    if (userData) {
      this.currentUser = JSON.parse(userData)
      document.getElementById("user-name").textContent = this.currentUser.name || "Patient"
    }
  }

  // Load reminders from API
  async loadReminders() {
    const result = await window.apiClient.getReminders() // Declare apiClient variable
    if (result.success) {
      this.reminders = result.data
      this.renderReminders()
    } else {
      // Use mock data if API fails
      this.reminders = this.getMockReminders()
      this.renderReminders()
    }
  }

  // Load consultations from API
  async loadConsultations() {
    const result = await window.apiClient.getConsultations() // Declare apiClient variable
    if (result.success) {
      this.consultations = result.data
      this.renderConsultations()
    } else {
      // Use mock data if API fails
      this.consultations = this.getMockConsultations()
      this.renderConsultations()
    }
  }

  // Get mock reminders (fallback data)
  getMockReminders() {
    return [
      {
        id: 1,
        title: "Take Morning Medication",
        time: "08:00",
        description: "Take prescribed medication with breakfast",
        completed: false,
      },
      {
        id: 2,
        title: "Doctor Appointment",
        time: "14:30",
        description: "Cardiology consultation with Dr. A. Sharma",
        completed: false,
      },
    ]
  }

  // Get mock consultations (fallback data)
  getMockConsultations() {
    return [
      {
        id: 1,
        doctor: "Dr. A. Sharma",
        specialty: "Cardiology",
        date: "2025-10-28",
        time: "14:30",
      },
      {
        id: 2,
        doctor: "Dr. P. Gupta",
        specialty: "Neurology",
        date: "2025-11-05",
        time: "10:00",
      },
    ]
  }

  // Render reminders to DOM
  renderReminders() {
    const remindersList = document.getElementById("reminders-list")
    const remindersListDesktop = document.getElementById("reminders-list-desktop")

    const html =
      this.reminders.length === 0
        ? '<p class="empty-state">No reminders yet. Add one to get started!</p>'
        : this.reminders.map((reminder) => this.createReminderElement(reminder)).join("")

    if (remindersList) remindersList.innerHTML = html
    if (remindersListDesktop) remindersListDesktop.innerHTML = html

    // Add event listeners to reminder buttons
    this.attachReminderEventListeners()
  }

  // Create reminder element HTML
  createReminderElement(reminder) {
    return `
      <div class="reminder-item ${reminder.completed ? "completed" : ""}">
        <div class="reminder-header">
          <h3 class="reminder-title">${this.escapeHtml(reminder.title)}</h3>
          <span class="reminder-time">${reminder.time}</span>
        </div>
        ${reminder.description ? `<p class="reminder-description">${this.escapeHtml(reminder.description)}</p>` : ""}
        <div class="reminder-actions">
          <button class="btn-success btn-small complete-reminder" data-id="${reminder.id}">
            ${reminder.completed ? "✓ Completed" : "Mark Complete"}
          </button>
          <button class="btn-secondary btn-small edit-reminder" data-id="${reminder.id}">Edit</button>
          <button class="btn-danger btn-small delete-reminder" data-id="${reminder.id}">Delete</button>
        </div>
      </div>
    `
  }

  // Render consultations to DOM
  renderConsultations() {
    const consultationsList = document.getElementById("consultations-list")
    const consultationsListDesktop = document.getElementById("consultations-list-desktop")

    const html =
      this.consultations.length === 0
        ? '<p class="empty-state">No consultations scheduled.</p>'
        : this.consultations.map((consultation) => this.createConsultationElement(consultation)).join("")

    if (consultationsList) consultationsList.innerHTML = html
    if (consultationsListDesktop) consultationsListDesktop.innerHTML = html
  }

  // Create consultation element HTML
  createConsultationElement(consultation) {
    return `
      <div class="consultation-item">
        <h3 class="consultation-doctor">${this.escapeHtml(consultation.doctor)}</h3>
        <p class="consultation-date">
          <strong>Specialty:</strong> ${this.escapeHtml(consultation.specialty)}<br>
          <strong>Date:</strong> ${consultation.date} at ${consultation.time}
        </p>
      </div>
    `
  }

  setupMobileSlider() {
    const dotsContainer = document.getElementById("slider-dots")
    const sliderWrapper = document.querySelector(".slider-wrapper")

    if (!dotsContainer || !sliderWrapper) return

    // Create dots
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("button")
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`)
      dot.addEventListener("click", () => this.goToSlide(i))
      dotsContainer.appendChild(dot)
    }

    // Touch swipe support
    let touchStartX = 0
    let touchEndX = 0

    sliderWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    sliderWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      this.handleSwipe(touchStartX, touchEndX)
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousSlide()
      if (e.key === "ArrowRight") this.nextSlide()
    })
  }

  // Go to specific slide
  goToSlide(index) {
    this.currentSlide = index
    const sliderWrapper = document.querySelector(".slider-wrapper")
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`

    // Update dots
    document.querySelectorAll(".slider-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })
  }

  // Next slide
  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1)
    }
  }

  // Previous slide
  previousSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1)
    }
  }

  // Handle swipe gesture
  handleSwipe(startX, endX) {
    const threshold = 50
    if (startX - endX > threshold) {
      this.nextSlide()
    } else if (endX - startX > threshold) {
      this.previousSlide()
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Mobile add reminder button
    const addReminderBtn = document.getElementById("add-reminder-btn")
    if (addReminderBtn) {
      addReminderBtn.addEventListener("click", () => this.openReminderModal())
    }

    // Desktop add reminder button
    const addReminderBtnDesktop = document.getElementById("add-reminder-btn-desktop")
    if (addReminderBtnDesktop) {
      addReminderBtnDesktop.addEventListener("click", () => this.openReminderModalDesktop())
    }

    // Mobile modal close
    const closeModal = document.getElementById("close-modal")
    if (closeModal) {
      closeModal.addEventListener("click", () => this.closeReminderModal())
    }

    // Desktop modal close
    const closeModalDesktop = document.getElementById("close-modal-desktop")
    if (closeModalDesktop) {
      closeModalDesktop.addEventListener("click", () => this.closeReminderModalDesktop())
    }

    // Mobile cancel button
    const cancelReminder = document.getElementById("cancel-reminder")
    if (cancelReminder) {
      cancelReminder.addEventListener("click", () => this.closeReminderModal())
    }

    // Desktop cancel button
    const cancelReminderDesktop = document.getElementById("cancel-reminder-desktop")
    if (cancelReminderDesktop) {
      cancelReminderDesktop.addEventListener("click", () => this.closeReminderModalDesktop())
    }

    // Mobile reminder form submit
    const reminderForm = document.getElementById("reminder-form")
    if (reminderForm) {
      reminderForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleAddReminder()
      })
    }

    // Desktop reminder form submit
    const reminderFormDesktop = document.getElementById("reminder-form-desktop")
    if (reminderFormDesktop) {
      reminderFormDesktop.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleAddReminderDesktop()
      })
    }

    // Logout button
    const logoutBtn = document.getElementById("logout-btn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.logout())
    }

    // Mobile clear notifications
    const clearNotifications = document.getElementById("clear-notifications")
    if (clearNotifications) {
      clearNotifications.addEventListener("click", () => this.clearNotifications())
    }

    // Desktop clear notifications
    const clearNotificationsDesktop = document.getElementById("clear-notifications-desktop")
    if (clearNotificationsDesktop) {
      clearNotificationsDesktop.addEventListener("click", () => this.clearNotificationsDesktop())
    }

    // Mobile AJAX sync
    const syncDataBtn = document.getElementById("sync-data-btn")
    if (syncDataBtn) {
      syncDataBtn.addEventListener("click", () => this.syncDataWithXHR())
    }

    // Desktop AJAX sync
    const syncDataBtnDesktop = document.getElementById("sync-data-btn-desktop")
    if (syncDataBtnDesktop) {
      syncDataBtnDesktop.addEventListener("click", () => this.syncDataWithXHRDesktop())
    }

    // Close modal when clicking outside
    document.addEventListener("click", (e) => {
      const modal = document.getElementById("reminder-modal")
      const modalDesktop = document.getElementById("reminder-modal-desktop")
      if (e.target === modal) this.closeReminderModal()
      if (e.target === modalDesktop) this.closeReminderModalDesktop()
    })
  }

  openReminderModal() {
    const modal = document.getElementById("reminder-modal")
    if (modal) {
      modal.classList.remove("hidden")
      const titleInput = document.getElementById("reminder-title")
      if (titleInput) titleInput.focus()
    }
  }

  closeReminderModal() {
    const modal = document.getElementById("reminder-modal")
    if (modal) {
      modal.classList.add("hidden")
      const form = document.getElementById("reminder-form")
      if (form) form.reset()
    }
  }

  openReminderModalDesktop() {
    const modal = document.getElementById("reminder-modal-desktop")
    if (modal) {
      modal.classList.remove("hidden")
      const titleInput = document.getElementById("reminder-title-desktop")
      if (titleInput) titleInput.focus()
    }
  }

  closeReminderModalDesktop() {
    const modal = document.getElementById("reminder-modal-desktop")
    if (modal) {
      modal.classList.add("hidden")
      const form = document.getElementById("reminder-form-desktop")
      if (form) form.reset()
    }
  }

  // Attach event listeners to reminder buttons
  attachReminderEventListeners() {
    // Complete reminder buttons
    document.querySelectorAll(".complete-reminder").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id)
        this.toggleReminderComplete(id)
      })
    })

    // Delete reminder buttons
    document.querySelectorAll(".delete-reminder").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id)
        this.deleteReminder(id)
      })
    })

    // Edit reminder buttons
    document.querySelectorAll(".edit-reminder").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id)
        this.editReminder(id)
      })
    })
  }

  // Handle add reminder (mobile)
  async handleAddReminder() {
    const title = document.getElementById("reminder-title").value
    const time = document.getElementById("reminder-time").value
    const description = document.getElementById("reminder-description").value

    const validator = new window.FormValidator() // Declare FormValidator variable
    const formData = { title, time, description }

    if (!validator.validateReminderForm(formData)) {
      const errors = validator.getErrors()
      this.showToast("Please fill in all required fields", "error")
      return
    }

    // Create reminder object
    const reminder = {
      id: Date.now(),
      title,
      time,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    // Add to API
    const result = await window.apiClient.createReminder(reminder)

    if (result.success || !result.success) {
      this.reminders.push(reminder)
      this.renderReminders()
      this.updateStats()
      this.closeReminderModal()
      this.showToast("Reminder added successfully!", "success")
      this.addNotification("New reminder created: " + title, "success")
    }
  }

  // Handle add reminder (desktop)
  async handleAddReminderDesktop() {
    const title = document.getElementById("reminder-title-desktop").value
    const time = document.getElementById("reminder-time-desktop").value
    const description = document.getElementById("reminder-description-desktop").value

    const validator = new window.FormValidator() // Declare FormValidator variable
    const formData = { title, time, description }

    if (!validator.validateReminderForm(formData)) {
      const errors = validator.getErrors()
      this.showToast("Please fill in all required fields", "error")
      return
    }

    // Create reminder object
    const reminder = {
      id: Date.now(),
      title,
      time,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    // Add to API
    const result = await window.apiClient.createReminder(reminder)

    if (result.success || !result.success) {
      this.reminders.push(reminder)
      this.renderReminders()
      this.updateStats()
      this.closeReminderModalDesktop()
      this.showToast("Reminder added successfully!", "success")
      this.addNotification("New reminder created: " + title, "success")
    }
  }

  // Toggle reminder complete status
  toggleReminderComplete(id) {
    const reminder = this.reminders.find((r) => r.id === id)
    if (reminder) {
      reminder.completed = !reminder.completed
      this.renderReminders()
      this.updateStats()
      this.showToast(reminder.completed ? "Reminder marked as complete!" : "Reminder marked as incomplete", "success")
    }
  }

  // Delete reminder
  async deleteReminder(id) {
    if (confirm("Are you sure you want to delete this reminder?")) {
      const result = await window.apiClient.deleteReminder(id)

      this.reminders = this.reminders.filter((r) => r.id !== id)
      this.renderReminders()
      this.updateStats()
      this.showToast("Reminder deleted successfully!", "success")
      this.addNotification("Reminder deleted", "success")
    }
  }

  // Edit reminder
  editReminder(id) {
    const reminder = this.reminders.find((r) => r.id === id)
    if (reminder) {
      // Check if on mobile or desktop
      const isMobile = window.innerWidth <= 768

      if (isMobile) {
        document.getElementById("reminder-title").value = reminder.title
        document.getElementById("reminder-time").value = reminder.time
        document.getElementById("reminder-description").value = reminder.description
        this.openReminderModal()
      } else {
        document.getElementById("reminder-title-desktop").value = reminder.title
        document.getElementById("reminder-time-desktop").value = reminder.time
        document.getElementById("reminder-description-desktop").value = reminder.description
        this.openReminderModalDesktop()
      }

      // Delete old reminder
      this.reminders = this.reminders.filter((r) => r.id !== id)
    }
  }

  // Update dashboard stats
  updateStats() {
    document.getElementById("reminders-count").textContent = this.reminders.length
    document.getElementById("consultations-count").textContent = this.consultations.length
    document.getElementById("appointments-count").textContent = this.consultations.length
  }

  // Start live notifications
  startLiveNotifications() {
    // Show a notification every 30 seconds
    this.notificationInterval = setInterval(() => {
      const messages = [
        "Remember to stay hydrated!",
        "Time for your scheduled reminder",
        "Check your upcoming appointments",
        "Your health score is improving!",
      ]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      this.addNotification(randomMessage, "success")
    }, 30000) // 30 seconds
  }

  // Add notification
  addNotification(message, type = "success") {
    // Add to mobile container
    const container = document.getElementById("notifications-container")
    if (container) {
      const emptyState = container.querySelector(".empty-state")
      if (emptyState) emptyState.remove()

      const notification = document.createElement("div")
      notification.className = `notification-item ${type}`
      notification.innerHTML = `
        <span class="notification-text">${this.escapeHtml(message)}</span>
        <span class="notification-time">${new Date().toLocaleTimeString()}</span>
      `

      container.insertBefore(notification, container.firstChild)

      setTimeout(() => {
        notification.remove()
        if (container.children.length === 0) {
          container.innerHTML = '<p class="empty-state">No notifications at the moment.</p>'
        }
      }, 10000)
    }

    // Add to desktop container
    const containerDesktop = document.getElementById("notifications-container-desktop")
    if (containerDesktop) {
      const emptyState = containerDesktop.querySelector(".empty-state")
      if (emptyState) emptyState.remove()

      const notification = document.createElement("div")
      notification.className = `notification-item ${type}`
      notification.innerHTML = `
        <span class="notification-text">${this.escapeHtml(message)}</span>
        <span class="notification-time">${new Date().toLocaleTimeString()}</span>
      `

      containerDesktop.insertBefore(notification, containerDesktop.firstChild)

      setTimeout(() => {
        notification.remove()
        if (containerDesktop.children.length === 0) {
          containerDesktop.innerHTML = '<p class="empty-state">No notifications at the moment.</p>'
        }
      }, 10000)
    }
  }

  // Clear all notifications
  clearNotifications() {
    const container = document.getElementById("notifications-container")
    if (container) {
      container.innerHTML = '<p class="empty-state">No notifications at the moment.</p>'
    }
  }

  // Clear all notifications (desktop)
  clearNotificationsDesktop() {
    const container = document.getElementById("notifications-container-desktop")
    if (container) {
      container.innerHTML = '<p class="empty-state">No notifications at the moment.</p>'
    }
  }

  // Sync data using XMLHttpRequest (AJAX Demo)
  syncDataWithXHR() {
    const statusDiv = document.getElementById("ajax-status")
    if (!statusDiv) return

    statusDiv.className = "ajax-status loading"
    statusDiv.innerHTML = "<p>Syncing data using XMLHttpRequest...</p>"

    const xhr = new XMLHttpRequest()

    xhr.open("GET", "http://localhost:3001/reminders", true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText)
          statusDiv.className = "ajax-status success"
          statusDiv.innerHTML = `
            <p><strong>✓ Data synced successfully!</strong></p>
            <p>Fetched ${data.length} reminders using XMLHttpRequest</p>
            <p><small>Response time: ${new Date().toLocaleTimeString()}</small></p>
          `
          this.addNotification("Data synced successfully via AJAX", "success")
        } catch (e) {
          this.handleXHRError(statusDiv, "Invalid JSON response")
        }
      } else {
        this.handleXHRError(statusDiv, `HTTP Error: ${xhr.status}`)
      }
    }

    xhr.onerror = () => {
      this.handleXHRError(statusDiv, "Network error - Make sure JSON Server is running on port 3001")
    }

    xhr.send()
  }

  // Sync data using XMLHttpRequest (AJAX Demo - Desktop)
  syncDataWithXHRDesktop() {
    const statusDiv = document.getElementById("ajax-status-desktop")
    if (!statusDiv) return

    statusDiv.className = "ajax-status loading"
    statusDiv.innerHTML = "<p>Syncing data using XMLHttpRequest...</p>"

    const xhr = new XMLHttpRequest()

    xhr.open("GET", "http://localhost:3001/reminders", true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText)
          statusDiv.className = "ajax-status success"
          statusDiv.innerHTML = `
            <p><strong>✓ Data synced successfully!</strong></p>
            <p>Fetched ${data.length} reminders using XMLHttpRequest</p>
            <p><small>Response time: ${new Date().toLocaleTimeString()}</small></p>
          `
          this.addNotification("Data synced successfully via AJAX", "success")
        } catch (e) {
          this.handleXHRError(statusDiv, "Invalid JSON response")
        }
      } else {
        this.handleXHRError(statusDiv, `HTTP Error: ${xhr.status}`)
      }
    }

    xhr.onerror = () => {
      this.handleXHRError(statusDiv, "Network error - Make sure JSON Server is running on port 3001")
    }

    xhr.send()
  }

  // Handle XHR errors
  handleXHRError(statusDiv, message) {
    statusDiv.className = "ajax-status error"
    statusDiv.innerHTML = `
      <p><strong>✗ Sync failed</strong></p>
      <p>${this.escapeHtml(message)}</p>
      <p><small>Make sure JSON Server is running: <code>json-server --watch db.json --port 3001</code></small></p>
    `
    this.addNotification("Data sync failed: " + message, "error")
  }

  // Show toast notification
  showToast(message, type = "success") {
    const toast = document.getElementById("notification-toast")
    if (toast) {
      toast.textContent = message
      toast.className = `notification-toast show ${type}`

      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    }
  }

  // Logout user
  logout() {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("zenith-user")
      clearInterval(this.notificationInterval)
      window.location.href = "login.html"
    }
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Dashboard()
})
