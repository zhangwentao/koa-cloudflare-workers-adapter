import { Readable } from "stream"
import { ReadableStreamDefaultReader } from "stream/web"
const COPY_PROPS = [
	'url',
	'method',
	'cf',
	'redirect'
]

class IncomingStream extends Readable {
  private readonly reader: ReadableStreamDefaultReader
  public headers: Record<string,any>
	constructor(request) {
		super()
		COPY_PROPS.forEach(prop => {
			this[prop] = request[prop]
		})
		this.headers = request.headers.keys().reduce((headers,key) => {
			headers[key] = request.headers.get(key)
			return headers
		},{})
		this.reader = request?.body?.getReader()
	}

	_read() {
		this?.reader?.read()?.then(({ done, value }) => {
			if (done) {
				this.push(null)
			} else {
				this.push(value)
			}
		})
	}

}

export {
	IncomingStream
}
