import { Elysia } from "elysia";
import {apiRouter} from "~/routes/api";
import {authRouter} from "~/routes/auth";
import {pageRouter} from "~/routes/page";

export const mainRouter = new Elysia()
    .use(apiRouter)
    .use(authRouter)
    .use(pageRouter)


