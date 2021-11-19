export interface IDatabaseConnectionHolder<T> {
  initialize(): Promise<void>;

  getInstance(): T;

  close(): Promise<void>;
}
