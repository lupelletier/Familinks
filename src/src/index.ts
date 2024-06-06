import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import {mainRouter} from "~/routes/main";
import {PrismaClient} from "@prisma/client";
import {deviceDetectionMiddleware} from "~/middlewares/deviceDetection";
import {logger} from "~/utils/logger";

// prisma client
export const prisma = new PrismaClient();

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
            `Handling request: ${request.method} ${request.url} - ${request.headers.get('user-agent')}`
        );
    })
   .onError(({ code, error }) => {
        return new Response(error.toString())
    })
/*    .on('afterHandle', async ({ request, response }) => {
        logger.info(
            `Handled request: ${request.method} ${request.url} - Status: ${response.statusCode}`
        );
    })*/
    .use(mainRouter);