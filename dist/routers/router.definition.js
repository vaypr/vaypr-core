"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utilities_1 = require("../utilities");
var RouteMethods;
(function (RouteMethods) {
    RouteMethods["get"] = "get";
    RouteMethods["post"] = "post";
    RouteMethods["put"] = "put";
    RouteMethods["delete"] = "delete";
    RouteMethods["options"] = "options";
    RouteMethods["patch"] = "patch";
    RouteMethods["head"] = "head";
})(RouteMethods = exports.RouteMethods || (exports.RouteMethods = {}));
class VayprRouter {
    constructor() {
        this.router = express.Router();
    }
    initRoutes() {
        utilities_1.logger.info('initializing routes for ' + this.constructor.name);
        this.routes.forEach(route => this.addRoute(route));
    }
    addRoute(route) {
        this.router[route.method](route.path, ...route.handlers);
    }
}
exports.VayprRouter = VayprRouter;
