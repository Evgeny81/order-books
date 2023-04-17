class NotificationService {
  showSuccess(message: string): void {
    console.log(`Success: ${message}`);
  }

  showError(message: string): void {
    console.error(`Something goes wrong! Error: ${message}`);
  }
}

export const notificationService = new NotificationService();
