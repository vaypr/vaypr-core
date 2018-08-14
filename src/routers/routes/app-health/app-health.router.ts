import * as express from 'express';
import { VayprRoute } from '../../route.definition';
import { VayprRouter } from '../../router.definition';

const upDate = new Date();

export class AppHealthRouter extends VayprRouter {
  path = '/health';
  routes = [
    new VayprRoute('get', '/', this.healthRoute)
  ];

  async healthRoute(req: express.Request, res: express.Response) {
    res.json({ status: 'up', upDate, upTime: `${new Date().getTime() - upDate.getTime()}ms` });
  }
}
