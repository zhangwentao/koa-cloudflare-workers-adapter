This adapter bridges the gap between Koa and Cloudflare Workers. With minimal code changes, you can leverage your existing Koa application logic within a Cloudflare Worker environment.

### Benefits

* **Seamless Integration:** Easily run your Koa application in Cloudflare Workers.
* **Reduced Development Time:** Leverage existing Koa codebase without significant modifications.
* **Improved Performance:** Enjoy the benefits of Cloudflare's global edge network.

### Installation

1. Install the adapter package in your existing Koa project:

```bash
npm install koa-cloudflare-workers-adapter --save
```

### Usage

**1. Prepare Your Koa Project:**

**Existing Project:** If you have an existing Koa project, you can skip this step.

**New Project:** Here's a basic Koa application structure for reference:

```javascript
import koa from 'koa';
import Router from '@koa/router';
import { bodyParser }from '@koa/bodyparser';

const app = new koa();
const parser = bodyParser();
const router = new Router();

app.use(parser);

// Define your Koa routes here (example routes below)

router.get('/', async (ctx) => {
  ctx.body = 'Default';
});

router.get('/test', async (ctx) => {
  ctx.body = 'Test handler';
});

router.post('/handlepost', async (ctx) => {
  ctx.body = ctx.request.body;
});

app.use(router.routes());

export {
  app,
};
```

**2. Include the Adapter:**

Install the `koa-cloudflare-workers-adapter` package in your Koa project.

**3. Integrate with Cloudflare Workers:**

In your Cloudflare Worker's `index.js` or `index.ts` file:

```javascript
import { KoaCloudflareWorkersAdapter } from 'koa-cloudflare-workers-adapter';
import { app } from './your-koa-app'; // Replace with your Koa app import path

export default {
  fetch: new KoaCloudflareWorkersAdapter(app).fetch,
};
```

**Explanation:**

* We import the `KoaCloudflareWorkersAdapter` class.
* We import your Koa application instance (`app`).
* We create a new adapter instance using your Koa app.
* We access the `fetch` function from the adapter and assign it to the `fetch` property of the default export object.

This configuration routes incoming Cloudflare Worker requests to your Koa application's middleware chain for processing.

**Optional Customization:**

The example provided utilizes the default behavior of the adapter. You can optionally customize the `fetch` function for more control over request handling within the Cloudflare Worker environment.

**Additional Notes:**

* Ensure your Koa project includes all necessary dependencies (e.g., `koa`, `@koa/router`, etc.).
* Refer to the Koa documentation for further details on middleware and routing: [https://github.com/koajs/koa](https://github.com/koajs/koa)

### Contributing

We welcome contributions to this project! Please refer to the CONTRIBUTING file for guidelines.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
