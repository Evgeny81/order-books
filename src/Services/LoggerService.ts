class LoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string, errorStack?: string): void {
    console.error(`[ERROR]: ${message}`, errorStack);
  }
}

export const loggerService = new LoggerService();
