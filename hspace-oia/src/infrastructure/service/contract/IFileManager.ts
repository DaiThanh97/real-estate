export interface IFileManager {
  upload(file: File): Promise<any>;

  delete(key: string): Promise<any>;
}
