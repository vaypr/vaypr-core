export enum ResourceMethods {
  'READ' = 'READ',
  'CREATE' = 'CREATE',
  'UPDATE' = 'UPDATE',
  'DELETE' = 'DELETE',
  'INDEX' = 'INDEX'
}

export type ResourceMethod = keyof typeof ResourceMethods;
