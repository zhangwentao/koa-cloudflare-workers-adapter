import {ServerResponse} from 'http'
import { Transform } from 'stream'
import { ReadableStream } from 'stream/web'

class TransferStream extends Transform {
	constructor() {
		super()
	}
	_transform(chunk, encoding, callback) {
		this.push(chunk, encoding)
		callback(null)
	}
}

class OutgoingStream extends ServerResponse {
	public body: ReadableStream
	private buf: TransferStream
	constructor() {
		super(undefined)
		this.buf = new TransferStream()
		this.body = new ReadableStream({
			start: (controller) => {
				this.buf.on('data', (chunk) => {
					console.log(chunk)
					controller.enqueue(chunk)
					controller.close()
				})
			}
		})
	}

	_write(chunk, encoding, callback) {
		this.buf.write(chunk,encoding)
		// super._write(chunk, encoding, callback);
		// callback(null)
	}

}

export {
	OutgoingStream
}
