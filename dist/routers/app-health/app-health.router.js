"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_definition_1 = require("../router.definition");
const upTime = new Date();
function healthRoute(req, res) {
    res.json({ status: 'up', upTime });
}
class AppHealthRouter extends router_definition_1.MVCARouter {
    constructor() {
        super(...arguments);
        this.baseRoute = '/health';
        this.routes = [
            {
                method: router_definition_1.RouteMethods['get'],
                path: '/',
                handlers: [healthRoute]
            }
        ];
    }
}
exports.default = AppHealthRouter;
