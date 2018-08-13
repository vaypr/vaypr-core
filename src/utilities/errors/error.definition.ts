import * as uuid from 'uuid/v4';

import { ErrorType, ErrorTypes } from './error-types.type';
import { id } from '../types';

export class VayprError extends Error {
  public id: id = uuid();

  constructor(
    public message: string,
    public type: ErrorType = 'NORMAL',
    public metadadata?: any
  ) { 
    super();
    if(!ErrorTypes[type]) {
      this.message = `INVALID ERROR TYPE '${this.type}' SUPPLIED, defaulting to 'NORMAL' - Original message: ${this.message}`;
      this.type = 'NORMAL';
    }
  }
}
