import { OutgoingStream } from './outgoing_stream';
import {IncomingStream} from './incoming_stream'
import { IncomingMessage } from 'http';
import { ExportedHandlerFetchHandler } from '@cloudflare/workers-types'
import Application from 'koa'

class KoaCloudflareWorkersAdapter {
	public koaInstance: Application
	constructor(koaInstance: Application) {
		this.koaInstance = koaInstance
	}

	async _fetch (
		request: Parameters<ExportedHandlerFetchHandler>['0']
	) {
		const req: unknown = new IncomingStream(request)
		const res = new OutgoingStream()
		this.koaInstance.callback()(req as IncomingMessage, res)
		return new Response(res.body)
	}

	get fetch (): ExportedHandlerFetchHandler  {
		return this._fetch.bind(this)
	}
}

export {
	KoaCloudflareWorkersAdapter,
	KoaCloudflareWorkersAdapter as default
}
