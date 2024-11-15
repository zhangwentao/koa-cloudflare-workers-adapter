import { Readable } from "stream";
declare class IncomingStream extends Readable {
    private readonly reader;
    headers: Record<string, any>;
    constructor(request: any);
    _read(): void;
}
export { IncomingStream };
