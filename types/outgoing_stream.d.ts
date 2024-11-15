import { ServerResponse } from 'http';
import { ReadableStream } from 'stream/web';
declare class OutgoingStream extends ServerResponse {
    body: ReadableStream;
    private buf;
    constructor();
    _write(chunk: any, encoding: any, callback: any): void;
}
export { OutgoingStream };
