export interface ILogger {
  initialize(): Promise<void>;
  info(message: string): void;
  error<T>(message: string, errorObj?: T): void;
  debug<T>(message: string, obj?: T): void;
}
