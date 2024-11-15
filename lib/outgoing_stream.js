"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingStream = void 0;
const http_1 = require("http");
const stream_1 = require("stream");
const web_1 = require("stream/web");
class TransferStream extends stream_1.Transform {
    constructor() {
        super();
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk, encoding);
        callback(null);
    }
}
class OutgoingStream extends http_1.ServerResponse {
    constructor() {
        super(undefined);
        this.buf = new TransferStream();
        this.body = new web_1.ReadableStream({
            start: (controller) => {
                this.buf.on('data', (chunk) => {
                    console.log(chunk);
                    controller.enqueue(chunk);
                    controller.close();
                });
            }
        });
    }
    _write(chunk, encoding, callback) {
        this.buf.write(chunk, encoding);
        // super._write(chunk, encoding, callback);
        // callback(null)
    }
}
exports.OutgoingStream = OutgoingStream;
