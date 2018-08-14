export interface IUnknownError {
  error: 'Unknown Error';
  status: 520;
  _message: string;
}

export const createUnknownError = (error: Error): IUnknownError => ({
  error: 'Unknown Error',
  status: 520,
  _message: error.toString(),
})
