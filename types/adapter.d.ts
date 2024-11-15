import { ExportedHandlerFetchHandler } from '@cloudflare/workers-types';
import Application from 'koa';
declare class KoaCloudflareWorkersAdapter {
    koaInstance: Application;
    constructor(koaInstance: Application);
    _fetch(request: Parameters<ExportedHandlerFetchHandler>['0']): Promise<Response>;
    get fetch(): ExportedHandlerFetchHandler;
}
export { KoaCloudflareWorkersAdapter, KoaCloudflareWorkersAdapter as default };
