declare module 'micro-errors' {
  interface IData {
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
    data?: IData;
  }

  export function createError(status: number, title: string, originalError?: Error, optionalData?: IData): IMicroError;
}
