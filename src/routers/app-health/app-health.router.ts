import * as express from 'express';

import { RouteMethods, VayprRouter } from '../router.definition';

const upTime = new Date();

export default class AppHealthRouter extends VayprRouter {
  baseRoute = '/health';
  routes = [
    {
      method: RouteMethods['get'],
      path: '/',
      handlers: [this.healthRoute]
    }
  ];

  healthRoute(req: express.Request, res: express.Response) {
    res.json({ status: 'up', upTime });
  }
}
