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
import {logger} from "~/utils/logger";
import {prisma} from "~/index";
import {getDailyQuestion, userAnsweredQuestion} from "~/services/daily";
import AnswerQuestion from "~/views/pages/auth/answerQuestion";

export const pageRouter = new Elysia()
    // Route handler
    .get('/', async ({ set, jwt, cookie: { auth }, store }: any) => {
        try {
            // Verify the token and decode the payload
            const profile = await jwt.verify(auth.value);
            console.log('profile', profile);
            console.log('store', store);

            if (!profile) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }

            // Check if the user is stored in the session and has a familyId
            if (!store.user || !store.user.familyId) {
                const user = await prisma.user.findUnique({
                    where: {
                        userId: profile.userId,
                    },
                });
                console.log('user', user);
                if (user) {
                    store.user = user;
                } else {
                    set.status = 401;
                    set.redirect = '/auth/home';
                    return;
                }

                if (!store.user.familyId) {
                    set.status = 401;
                    set.redirect = '/auth/family';
                    return;
                }
            }
            const question = await getDailyQuestion();
            console.log('question', question);

            return (
                <MainLayout>
                    <Home user={store.user} question={question} />
                </MainLayout>
            );
        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 500;
            set.redirect = '/auth/home';
            return;
        }
    })
    .get('/answer-question', async ({ set, store }: any) => {
        if (!store.user || !store.user.familyId) {
            set.status = 401;
            set.redirect = '/auth/home';
            return;
        }
        const question = await getDailyQuestion();

        return (
            <MainLayout>
                <AnswerQuestion user={store.user} question={question} />
            </MainLayout>
        );
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
