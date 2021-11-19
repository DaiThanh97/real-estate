export interface IFileConnectionHolder<T> {
  initialize(): Promise<void>;

  getInstance(): T;
}
