export interface IAuthConnectionHolder<T> {
  initialize(): Promise<void>;

  getInstance(): T;

  close(): Promise<void>;
}
