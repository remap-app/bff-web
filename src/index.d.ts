interface IOtherData {
  type?: string;
  detail?: string;
  data?: { [key: string]: any };
}

interface IMicroError extends Error {
  status: number;
  title: string;
  type?: string;
  originalError?: Error;
  detail?: string;
  data?: IOtherData;
}

declare module 'micro-errors' {
 export function createError(status: number, title: string, originalError?: Error, optionalData?: IOtherData): IMicroError;
}
