import { Elysia } from 'elysia';
import MainLayout from '~/views/layouts/main';
import ErrorMessage from '~/views/components/error-message';
import {Html} from "@elysiajs/html";
import Tree from "~/views/pages/auth/tree";
import Profile from "~/views/pages/auth/profile";
import History from "~/views/pages/auth/history";
import QuestionHistory from "~/views/pages/auth/history";
import {validateSession} from "~/middlewares/authentication";
import jwt from "@elysiajs/jwt";
import Login from "~/views/pages/guest/login";
import {authMiddleware} from "~/middlewares/middleware";
import Home from "~/views/pages/auth/home";

export const pageRouter = new Elysia()
/*  .onError(({ error, set }): JSX.Element => {
    logger.error(error);

    set.status = 200;
    return <ErrorMessage />;
  })*/
/*  .get('/', async (): Promise<any> => {
      return (
          <MainLayout>
            <Home/>
          </MainLayout>
      );
  })*/

    .use(
        jwt({
            name: "jwt",
            secret: Bun.env.JWT_SECRET!
        })
    )
// Route handler
    .get('/', async ({ set, jwt, cookie: {auth} }: any) => {
    try {
        // The token is automatically verified and the decoded payload is available as `jwt`
        const profile = await jwt.verify(auth.value);
        console.log('profile', profile);
        if (!profile) {
            set.status = 401;
            set.redirect = '/auth/login';
            return;
        }


        // Main handler logic
        return(
            <MainLayout>
                <Home/>
            </MainLayout>
        );
    } catch (error) {
        // Handle unexpected errors
        set.status = 500;
        return { message: 'Internal Server Error', error: error.message };
    }
})
/*    .get(
        '/',
        {
            beforeHandle: async ({ set, cookie: { auth } }: any) => {
                console.log(auth.session);
                if (!auth.value) {
                    set.status = 401;
                    return <ErrorMessage message={'You are not connected'} />;
                }
            }
        },
        async ({ jwt, set, cookie: { auth } }: any) => {
            try {
                const profile = await jwt.verify(auth.value);
                if (!profile) {
                    set.redirect = '/auth/login';
                }
            } catch (error) {
                set.status = 401;
                set.redirect = '/auth/login';
            }
        }
    )*/
    .get('/tree', async (): Promise<any> => {
        return (
            <MainLayout>
                <Tree/>
            </MainLayout>
        );
    })
    .get('/history', async (): Promise<any> => {
        return (
            <MainLayout>
                <QuestionHistory/>
            </MainLayout>
        );
    })
    .get('/profile', async (): Promise<any> => {
        return (
            <MainLayout>
                <Profile/>
            </MainLayout>
        );
    })

