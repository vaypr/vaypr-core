import * as express from 'express';
import { Route } from '../../route.definition';
import { Router } from '../../router.definition';

const upDate = new Date();

export class AppHealthRouter extends Router {
  path = '/health';
  routes = [
    new Route('get', '/', this.healthRoute)
  ];

  async healthRoute(req: express.Request, res: express.Response) {
    res.json({ status: 'up', upDate, upTime: `${new Date().getTime() - upDate.getTime()}ms` });
  }
}
