const AllowImageMIMETypes: Readonly<string[]> = [
  "image/jpeg",
  "image/jpe",
  "image/jpg",
  "image/png",
  "image/jp2",
  "image/x-jp2",
  "image/jpf",
  "image/x-jpf",
  "image/mj2",
  "image/jpm",
  "image/jpx",
  "image/jpc",
  "image/webp",
] as const;
const AllowDocumentMIMETypes: Readonly<string[]> = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "text/comma-separated-values",
] as const;
export const AllowMIMETypes: Readonly<string[]> = [...AllowImageMIMETypes, ...AllowDocumentMIMETypes] as const;
