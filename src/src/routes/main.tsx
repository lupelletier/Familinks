import { Elysia } from "elysia";
import {apiRouter} from "~/routes/api";
import {pageRouter} from "~/routes/page";
import {authRouter} from "~/routes/auth";
import {swagger} from "@elysiajs/swagger";

export const mainRouter = new Elysia()
    mainRouter
    .use(swagger())
    .use(apiRouter)
    .use(pageRouter)
    .use(authRouter(mainRouter))