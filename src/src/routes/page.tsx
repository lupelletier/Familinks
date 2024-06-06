import { Elysia } from 'elysia';
import MainLayout from '~/views/layouts/main';
import ErrorMessage from '~/views/components/error-message';
import {Html} from "@elysiajs/html";
import Tree from "~/views/pages/auth/tree";
import Profile from "~/views/pages/auth/profile";
import QuestionHistory from "~/views/pages/auth/history";
import Home from "~/views/pages/auth/home";
import {prisma} from "~/index";
import {getDailyQuestion, getFamilyByFamilyId, userAnsweredQuestion} from "~/services/daily";
import AnswerQuestion from "~/views/pages/auth/answerQuestion";
import {getUsersByFamilyId} from "~/utils/db";
import Parameters from "~/views/pages/auth/parameters";

export const pageRouter = new Elysia()
    .state('user', '' )
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
    .get('/tree', async ({ store, jwt, set, cookie: { auth } }: any): Promise<any> => {
        // Check if the user is not already stored in the state

    try {
        if (!store.user) {
            // Verify the JWT token to ensure authentication
            const profile = await jwt.verify(auth.value);
            if (!profile) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }
            // Fetch the user details from jwt token
            store.user = await prisma.user.findUnique({
                where: {
                    userId: profile.userId,
                },
            });
        }
        const family = await getFamilyByFamilyId(store.user.familyId);
        const familyUsers = await getUsersByFamilyId(store.user.familyId);
        return (
            <MainLayout>
                <Tree user={store.user} familyUsers={familyUsers} familyName={family?.name}/>
            </MainLayout>
        )
        } catch (error) {
                // Set status to 401 (Unauthorized) and redirect to home page if authentication fails
                set.status = 401;
                set.redirect = '/auth/home';
                return; // Return without rendering the page
        }
    })
    .get('/history', async (): Promise<any> => {
        return (
            <MainLayout>
                <QuestionHistory/>
            </MainLayout>
        );
    })
    .get('/profile', async ({ store, set, jwt, cookie: { auth } }: any): Promise<any> => {
        console.log('Initial store:', store);

        try {
            if (!store.user) {
                const token = auth.value;
                if (!token) {
                    set.status = 401;
                    set.redirect = '/auth/home';
                    return;
                }

                const profile = await jwt.verify(token);
                if (!profile) {
                    set.status = 401;
                    set.redirect = '/auth/home';
                    return;
                }

                console.log('Profile:', profile);

                store.user = await prisma.user.findUnique({
                    where: {
                        userId: profile.userId,
                    },
                });

                if (!store.user) {
                    set.status = 404;
                    set.redirect = '/auth/home';
                    return;
                }
            }
        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 500;
            set.redirect = '/auth/home';
            return;
        }
            console.log('Updated store:', store);

            return (
            <MainLayout>
                <Profile user={store.user}/>
            </MainLayout>
        );
    })
    .get('/parameters', async ({ store, set, jwt, cookie: { auth } }: any): Promise<any> => {
        console.log('Initial store:', store);

        try {
            if (!store.user) {
                const token = auth.value;
                if (!token) {
                    set.status = 401;
                    set.redirect = '/auth/home';
                    return;
                }

                const profile = await jwt.verify(token);
                if (!profile) {
                    set.status = 401;
                    set.redirect = '/auth/home';
                    return;
                }

                console.log('Profile:', profile);

                store.user = await prisma.user.findUnique({
                    where: {
                        userId: profile.userId,
                    },
                });

                if (!store.user) {
                    set.status = 404;
                    set.redirect = '/auth/home';
                    return;
                }
            }
        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 500;
            set.redirect = '/auth/home';
            return;
        }
        console.log('Updated store:', store);

        return (
            <MainLayout>
                <Parameters user={store.user}/>
            </MainLayout>
        );
    })
