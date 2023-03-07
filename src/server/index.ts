import http from 'node:http';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import route from 'koa-route';
import send from 'koa-send';
import session from 'koa-session';
import serve from 'koa-static';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
import { initializeDatabase } from './utils/initialize_database';
import { rootResolve } from './utils/root_resolve';

const PORT = Number(process.env.PORT ?? 8080);

async function init(): Promise<void> {
  await initializeDatabase();
  await dataSource.initialize();

  const app = new Koa();
  const httpServer = http.createServer(app.callback());

  app.keys = ['cookie-key'];
  app.use(bodyParser());
  app.use(session({}, app));

  const apolloServer = await initializeApolloServer();
  await apolloServer.start();

  app.use(
    route.all(
      '/graphql',
      koaMiddleware(apolloServer, {
        context: async ({ ctx }) => {
          return { session: ctx.session } as Context;
        },
      }),
    ),
  );

  app.use(
    route.post('/initialize', async (ctx) => {
      await initializeDatabase();
      ctx.status = 204;
    }),
  );

  app.use(
    route.get('/api/zipcode', async (ctx) => {
      const zipcode = ctx.query.zipcode as string;

      const result = await fetch(`https://zipcoda.net/api?zipcode=${zipcode}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      if (result.length !== 1) ctx.body = JSON.stringify([]);
      else ctx.body = JSON.stringify(result.items[0].components);
      ctx.status = 200;
    }),
  );

  app.use(serve(rootResolve('dist'), { immutable: true }));
  app.use(serve(rootResolve('public'), { immutable: true }));

  app.use(async (ctx) => await send(ctx, rootResolve('/dist/index.html')));

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  gracefulShutdown(httpServer, {
    async onShutdown(signal) {
      console.log(`Received signal to terminate: ${signal}`);
      await apolloServer.stop();
      await dataSource.destroy();
    },
  });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
