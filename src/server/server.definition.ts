import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';


import { logger, VayprError, VayprErrorHelper } from '../utilities';
import { ServerConfig } from './server-config.interface';

export class Server {
  private express = express;
  public app: express.Application;
  private httpServer: http.Server;
  private errorHelper: VayprErrorHelper;

  constructor(
    private config: ServerConfig
  ) {
    this.app = this.express();
    this.init();
  }

  private init() {
    this.addDefaultMiddleWare();
    this.addDefaultRoutes();
  }

  private addDefaultMiddleWare() {
    this.addMiddleWare(bodyParser.urlencoded({ 'extended': true }));
    this.addMiddleWare(bodyParser.json());
    // TODO: wrap morgan in winston for logging?
    this.addMiddleWare(morgan('dev'));
  }

  private addDefaultRoutes() {
    this.app.get('/', (req, res) => res.redirect('/health'));
  }

  async start() {
    logger.info('starting server');
    this.httpServer = http.createServer(this.app);
    this.errorHelper = new VayprErrorHelper(this.httpServer);
    this.httpServer.on('error', this.handleError);
    this.httpServer.listen(this.config.port);
    logger.info('server started on ' + this.config.port);
  }

  private handleError(err: VayprError) {
    if (!(err instanceof VayprError)) {
      err = new VayprError(err, 'NORMAL');
    }
    this.errorHelper.process(err);
  }

  addRouter(path: string, router: express.Router) {
    this.app.use(path, router);
  }

  addMiddleWare(middleWare: any) {
    this.app.use(middleWare);
  }
}
