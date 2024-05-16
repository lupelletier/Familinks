import { Elysia } from "elysia";
import {apiRouter} from "~/routes/api";
import {pageRouter} from "~/routes/page";
import {authRouter} from "~/routes/auth";

export const mainRouter = new Elysia()
    mainRouter
    .use(apiRouter)
    .use(pageRouter)
    .use(authRouter(mainRouter));