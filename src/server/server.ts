import * as http from 'http';

import { VaprRouter } from '../router';

export class VaprServer {
  server: http.Server;
  http = http;

  constructor(router: any) {
    this.server = http.createServer(router);
  }
}
