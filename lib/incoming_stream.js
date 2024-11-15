"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingStream = void 0;
const stream_1 = require("stream");
const COPY_PROPS = [
    'url',
    'method',
    'cf',
    'redirect'
];
class IncomingStream extends stream_1.Readable {
    constructor(request) {
        var _a;
        super();
        COPY_PROPS.forEach(prop => {
            this[prop] = request[prop];
        });
        this.headers = request.headers.keys().reduce((headers, key) => {
            headers[key] = request.headers.get(key);
            return headers;
        }, {});
        this.reader = (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.getReader();
    }
    _read() {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.reader) === null || _a === void 0 ? void 0 : _a.read()) === null || _b === void 0 ? void 0 : _b.then(({ done, value }) => {
            if (done) {
                this.push(null);
            }
            else {
                this.push(value);
            }
        });
    }
}
exports.IncomingStream = IncomingStream;
