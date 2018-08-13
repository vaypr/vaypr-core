import { Server } from 'http';

import { logger } from '../logger';
import { VayprError } from './error.definition';

export interface VayprErrorConfig {
  neverCrash: boolean;
}

export class VayprErrorHelper {

  constructor(
    private server: Server,
    private config: VayprErrorConfig = { neverCrash: false }
  ) { }

  process(error: VayprError) {
    if (error.type === 'CRASH' && !this.config.neverCrash) {
      this.logError(error);
      this.server.close();
    } else if (error.type === 'NORMAL') {
      this.logError(error);
    } else if (error.type !== 'SILENT') {
      this.logError(error, true);
    } else {
      this.logError(error);
    }
  }

  private logError(error: VayprError, silent = false) {
    if(!silent && error.metadadata) {
      logger.error(error.message, error.metadadata);
    } else {
      logger.error(error.message);
    }
  }
}
