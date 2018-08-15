import * as express from 'express';

import { Route } from './route.definition';
import { logger } from '../utilities';

export abstract class Router {
  abstract path: string;
  abstract routes: Route[];
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  initRoutes() {
    logger.info('initializing ' + this.routes.length + ' routes for ' + this.constructor.name);
    this.routes.forEach(route => this.addRoute(route));
  }

  addRoute(route: Route) {
    if (Array.isArray(route.handlers)) {
      console.log('handlers', route.handlers);
      for(let i = 0; i < route.handlers.length; i++) {
        this.router[route.method](route.path, route.handlers[i]);
      }
    } else {
      this.router[route.method](route.path, route.handlers);
    }
  }
}
