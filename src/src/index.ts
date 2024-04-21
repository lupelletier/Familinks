import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { logger } from './utils/logger';

import { apiV1Router } from './routes/api-v1';
import { pageRouter } from './routes/page';

export const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      prefix: '',
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    })
  )
  .on('beforeHandle', async ({ request }) => {
    logger.info(
      `${request.method} ${request.url} - ${request.headers.get('user-agent')}`
    );
  })
  .use(pageRouter)
  .use(apiV1Router);
