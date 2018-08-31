declare module 'styledux'

declare module 'react-jss/lib/jss'
declare module 'react-jss/lib/JssProvider'
declare module 'react-linkify'

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

declare module '*.css'
declare module '*.png'
declare module '*.jpg'
