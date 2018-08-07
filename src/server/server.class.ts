import * as http from 'http';
import * as express from 'express';
// import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { logger } from '../utilities';
import { VayprServerConfig } from './server-config.interface';

export class VayprServer {
  private express = express;
  public app: express.Application;
  private httpServer: http.Server;

  constructor(
    private config: VayprServerConfig
  ) {
    this.app = express();
    this.init();
  }

  private init() {
    this.addDefaultMiddleWare();
    this.addDefaultRoutes();
  }

  private addDefaultMiddleWare() {
    this.addMiddleWare(bodyParser.urlencoded({ 'extended': true }));
    this.addMiddleWare(bodyParser.json());
  }

  private addDefaultRoutes() {
    this.app.get('/', (req, res) => res.redirect('/health'));
  }

  async start() {
    logger.info('starting server');
    this.httpServer = http.createServer(this.app);
    this.httpServer.on('error', this.handleError);
    this.httpServer.listen(this.config.port);
    logger.info('server started on ' + this.config.port);
  }

  private handleError(err: string | Error) {
    logger.error('Application error: ', err);
  }

  addRouter(router: express.Router) {
    this.app.use('/', router);
  }

  addMiddleWare(middleWare: any) {
    this.app.use(middleWare);
  }
}
