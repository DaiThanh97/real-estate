export interface IFile {
  upload(file: File): Promise<{ key: string; url: string }>;
  delete(key: string): Promise<boolean>;
}
