koa-cloudflare-workers-adapter
==============================

this is a adapter, use it you can use Koa in cloudflare workers.

## Usage

### First Step
write a Koa App, just like below code

```javascript
import koa from 'koa'
import Router from '@koa/router';
import { bodyParser }from '@koa/bodyparser'
const app = new koa()
const parser = bodyParser()
const router = new Router()
app.use(parser)

router.get('/', async (ctx) => {
	ctx.body = 'default'
})

router.get('/test', async (ctx) => {
	ctx.body = 'test handler'
})

router.post('/handlepost', async(ctx) => {
	ctx.body = ctx.request.body
})

app.use(router.routes())

export {
	app
}
```


### Second Step
import your Koa intance, as the adapter class's constructor params, adapter instance return a async function, this need assigned to fetch field of default export objest.
```javascript
import {KoaCloudflareWorkersAdapter} from 'koa-cloudflare-workers-adapter'
import {app} from './koaapp'
export default {
	fetch: new KoaCloudflareWorkersAdapter(app).fetch

  /*
   * follow below usage, you can custom manipulate params from cloudflare fetch hanlder
  */

	// fetch: async (request,env,ctx) => {
	// 	return await (new KoaCloudflareWorkersAdapter(app)).fetch(request,env,ctx)
	// }
}

```

it works!