"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VayprError {
    constructor(id, message, stack) {
        this.id = id;
        this.message = message;
        this.stack = stack;
        this.err = new Error(this.message);
    }
}
exports.VayprError = VayprError;
