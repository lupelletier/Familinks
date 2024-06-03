import { Elysia } from "elysia";
import {apiRouter} from "~/routes/api";
import {pageRouter} from "~/routes/page";
import {authRouter} from "~/routes/auth";
import {swagger} from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";

export const mainRouter = new Elysia()
    mainRouter
    .use(swagger())
        // get the user from the session
    .state('user', '' )
    .use(
        jwt({
            name: "jwt",
            secret: Bun.env.JWT_SECRET!
        })
    )
    .use(apiRouter)
    .use(pageRouter)
    .use(authRouter(mainRouter))