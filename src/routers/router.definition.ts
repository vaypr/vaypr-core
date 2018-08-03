import * as express from 'express';
import { logger } from '../utilities';

export enum RouteMethods {
  'get' = 'get',
  'post' = 'post',
  'put' = 'put',
  'delete' = 'delete',
  'options' = 'options',
  'patch' = 'patch',
  'head' = 'head',
}

export interface VayprRoute {
  method: keyof typeof RouteMethods;
  path: string;
  handlers: express.RequestHandler[];
}

export abstract class VayprRouter {
  public router: express.Router;
  abstract baseRoute: string;
  abstract routes: VayprRoute[];

  constructor() {
    this.router = express.Router();
  }

  private initRoutes() {
    logger.info('initializing routes for ' + this.constructor.name);
    this.routes.forEach(route => this.addRoute(route));
  }

  addRoute(route: VayprRoute) {
    this.router[route.method](route.path, ...route.handlers);
  }
}
