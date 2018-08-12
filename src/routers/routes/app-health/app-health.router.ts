import * as express from 'express';

import { get } from '../../route-methods.constants';
import { VayprRouter } from '../../router.class';

const upDate = new Date();

export class AppHealthRouter extends VayprRouter {
  baseRoute = '/health';
  routes = [
    {
      method: get,
      path: '/',
      handlers: [this.healthRoute]
    }
  ];

  async healthRoute(req: express.Request, res: express.Response) {
    res.json({ status: 'up', upDate, upTime: `${new Date().getTime() - upDate.getTime()}ms` });
  }
}
