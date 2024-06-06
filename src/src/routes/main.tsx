import { Elysia } from "elysia";
import { apiRouter } from "~/routes/api";
import { pageRouter } from "~/routes/page";
import { authRouter } from "~/routes/auth";
import { swagger } from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import {authMiddleware} from "~/middlewares/middleware";

export const mainRouter = new Elysia()
    mainRouter
    .use(swagger())
    .use(jwt({ name: "jwt", secret: "secret" }))
    .derive(authMiddleware())
    .use(apiRouter)
    .use(pageRouter)
    .use(authRouter(mainRouter));
