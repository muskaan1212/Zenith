// Notifications Module
// Handles live notifications and periodic updates

class NotificationManager {
  constructor() {
    this.notifications = []
    this.maxNotifications = 10
  }

  // Add notification
  addNotification(message, type = "info", duration = 5000) {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
    }

    this.notifications.push(notification)

    // Keep only last maxNotifications
    if (this.notifications.length > this.maxNotifications) {
      this.notifications.shift()
    }

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, duration)
    }

    return notification
  }

  // Remove notification
  removeNotification(id) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
  }

  // Get all notifications
  getNotifications() {
    return this.notifications
  }

  // Clear all notifications
  clearAll() {
    this.notifications = []
  }
}

// Create global notification manager
const notificationManager = new NotificationManager()
