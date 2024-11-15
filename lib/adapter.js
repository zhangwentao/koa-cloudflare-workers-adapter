"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.KoaCloudflareWorkersAdapter = void 0;
const outgoing_stream_1 = require("./outgoing_stream");
const incoming_stream_1 = require("./incoming_stream");
class KoaCloudflareWorkersAdapter {
    constructor(koaInstance) {
        this.koaInstance = koaInstance;
    }
    _fetch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = new incoming_stream_1.IncomingStream(request);
            const res = new outgoing_stream_1.OutgoingStream();
            this.koaInstance.callback()(req, res);
            return new Response(res.body);
        });
    }
    get fetch() {
        return this._fetch.bind(this);
    }
}
exports.KoaCloudflareWorkersAdapter = KoaCloudflareWorkersAdapter;
exports.default = KoaCloudflareWorkersAdapter;
