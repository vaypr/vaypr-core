"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
// import * as morgan from 'morgan';
const bodyParser = require("body-parser");
const utilities_1 = require("../utilities");
class VayprServer {
    constructor(config) {
        this.config = config;
        this.express = express;
        this.app = express();
        this.init();
    }
    init() {
        this.addDefaultMiddleWare();
        this.addDefaultRoutes();
    }
    addDefaultMiddleWare() {
        this.addMiddleWare(bodyParser.urlencoded({ 'extended': true }));
        this.addMiddleWare(bodyParser.json());
    }
    addDefaultRoutes() {
        this.app.get('/', (req, res) => res.redirect('/health'));
    }
    start() {
        utilities_1.logger.info('starting server');
        this.httpServer = http.createServer(this.app);
        this.httpServer.on('error', this.handleError);
        this.httpServer.listen(this.config.port);
        utilities_1.logger.info('server started on ' + this.config.port);
    }
    handleError(err) {
        utilities_1.logger.error('Application error: ', err);
    }
    addRouter(router) {
        this.app.use('/', router);
    }
    addMiddleWare(middleWare) {
        this.app.use(middleWare);
    }
}
exports.VayprServer = VayprServer;
