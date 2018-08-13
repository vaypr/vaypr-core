export enum ErrorTypes {
  'SILENT' = 'SILENT',
  'NORMAL' = 'NORMAL',
  'SAFE' = 'SAFE',
  'CRASH' = 'CRASH'
}

export type ErrorType = keyof typeof  ErrorTypes;
