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
import Accessibility from "~/views/pages/accessibility";
import CGV from "~/views/pages/auth/CGV";
import CGU from "~/views/pages/auth/CGU";
import ConfidentialityPolicies from "~/views/pages/auth/confidentialityPolicies";

export const pageRouter = new Elysia()
    // Route handler
    .get('/', async ({ set, profile, user }: any) => {
        try {
            if (!profile || !user) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }
            const question = await getDailyQuestion();
            if (!user.familyId) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }
            return (
                <MainLayout>
                    <Home user={user} question={question} />
                </MainLayout>
            );
        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 500;
            set.redirect = '/auth/home';
            return;
        }
    })
    .get('/answer-question', async ({ set, user, profile }: any) => {
        if (!profile || !user) {
            set.status = 401;
            set.redirect = '/auth/home';
            return;
        }
        const question = await getDailyQuestion();

        return (
            <MainLayout>
                <AnswerQuestion user={user} question={question} />
            </MainLayout>
        );
    })
    .get('/tree', async ({user,profile, set}:any): Promise<any> => {
        // Check if the user is not already stored in the state
    try {
        if (!user) {
            // Verify the JWT token to ensure authentication
            if (!profile) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }
        }
        const family = await getFamilyByFamilyId(user.familyId);
        const familyUsers = await getUsersByFamilyId(user.familyId);
        return (
            <MainLayout>
                <Tree user={user} familyUsers={familyUsers} familyName={family?.name}/>
            </MainLayout>
        )
        } catch (error) {
                // Set status to 401 (Unauthorized) and redirect to home page if authentication fails
                set.status = 401;
                set.redirect = '/auth/home';
                return;
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
    .get('/parameters', async ({profile, user, set}: any): Promise<any> => {


        try {
            if (!profile || !user) {
                set.status = 401;
                set.redirect = '/auth/home';
                return;
            }

        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 500;
            set.redirect = '/auth/home';
            return;
        }

        return (
                <Parameters />
        );
    })
    .get('/confidentiality-policies' , async () => {
        return (
            <MainLayout>
                <ConfidentialityPolicies />
            </MainLayout>
        );
    })
    .get('/CGV', async () => {
        return (
            <MainLayout>
                <CGV />
            </MainLayout>
        );
    })
    .get('/CGU', async () => {
        return (
            <MainLayout>
                <CGU guest={false} />
            </MainLayout>
        );
    })

