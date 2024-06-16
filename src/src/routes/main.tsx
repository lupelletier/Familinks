import { Elysia } from "elysia";
import { apiRouter } from "~/routes/api";
import { pageRouter } from "~/routes/page";
import { authRouter } from "~/routes/auth";
import { swagger } from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import {authMiddleware} from "~/middlewares/middleware";
import CGU from "~/views/pages/auth/CGU";
import {Html} from "@elysiajs/html";
import GuestLayout from "~/views/layouts/guest";
import {deviceDetectionMiddleware} from "~/middlewares/deviceDetection";
import Desktop from "~/views/pages/guest/desktop";

export const mainRouter = new Elysia()
    mainRouter
    .use(swagger())
    .get('/terms', async () => {
        return (
            <GuestLayout>
                <CGU guest={true} />
            </GuestLayout>
        );
    })
    .get('/desktop', async () => {
        return (
            <GuestLayout>
                <Desktop/>
            </GuestLayout>
        )
    })
    .use(jwt({ name: "jwt", secret: "secret" }))
    .derive(authMiddleware())
/*
    .use(deviceDetectionMiddleware)
*/
    .use(apiRouter)
    .use(pageRouter)
    .use(authRouter(mainRouter));