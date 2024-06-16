import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import {getFamilyIdByCode} from "~/utils/db";
import {comparePassword, hashPasswordFn} from "~/utils/bcrypt";
import Login from "~/views/pages/guest/login";
import HomeGuest from "~/views/pages/guest/home";
import GuestLayout from "~/views/layouts/guest";
import SignUp from "~/views/pages/guest/signup";
import {prisma} from "~/index";
import JoinFamily from "~/views/pages/guest/joinFamily";
import Family from "~/views/pages/guest/family";
import CreateFamily from "~/views/pages/guest/createFamily";
import {faker} from "@faker-js/faker";
import {deviceDetectionMiddleware} from "~/middlewares/deviceDetection";
// Utility function to detect desktop or mobile based on User-Agent
function isDesktop(userAgent: string): boolean {
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/;
    return !mobileRegex.test(userAgent);
}
export const authRouter = (app: Elysia) =>
    app.group("/auth", (app) =>
        app
            .post(
                "/login",
                async ({ jwt, set, cookie: { auth }, body, request }: any) => {
                    const { username, password } = body;
                    // verify email/username
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { email: username },
                                { username },
                            ],
                        },
                    });

                    if (!user) {
                        set.status = 400;
                        console.log("Invalid credentials");
                        return {
                            success: false,
                            data: null,
                            message: "Invalid credentials",
                        };
                    }

                    // verify password
                    const match = await comparePassword(password, user.saltPassword, user.hashPassword);
                    if (!match) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Invalid credentials",
                        };
                    }

                    // generate access token
                    const accessToken = await jwt.sign({
                        userId: user.userId,
                    }, 'your_secret_key_here');
                    auth.set({
                        value: accessToken,
                        httpOnly: true,
                        maxAge: 15 * 60, // 15 minutes
                        path: "/",
                    });

                    // Store the user profile in the request context
                    request.profile = user;

                    // Redirect based on user's family ID
                    user.familyId === null ? set.redirect = "/auth/family" : set.redirect = "/";

                    return {
                        success: true,
                        data: user,
                        message: "Account logged in successfully",
                    };
                },
                {
                    body: t.Object({
                        username: t.String(),
                        password: t.String(),
                    }),
                }
            )
            .get('/signup', async () => {
                    return (
                        <GuestLayout>
                            <SignUp/>
                        </GuestLayout>
                    )
                }
            )
            .post(
                "/signup",
                async ({ body, set }) => {
                    const {username, firstname, lastname,   email, password  } = body;

                    // Validate email uniqueness
                    const emailExists = await prisma.user.findUnique({
                        where: { email },
                        select: { userId: true },
                    });
                    if (emailExists) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Email address already in use.",
                        };
                    }

                    // Validate username uniqueness
                    const usernameExists = await prisma.user.findUnique({
                        where: { username },
                        select: { userId: true },
                    });
                    if (usernameExists) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Someone already took this username.",
                        };
                    }

                 /*   let familyId = null;
                    if (familyCode) {
                        const familyCodeExists = await getFamilyIdByCode(familyCode);
                        if (!familyCodeExists) {
                            set.status = 400;
                            return {
                                success: false,
                                data: null,
                                message: "Invalid family code.",
                            };
                        }
                        familyId = await getFamilyIdByCode(familyCode);
                    }*/

                    const { hashPassword, saltPassword } = await hashPasswordFn(password);

                    const newUser = await prisma.user.create({
                        data: {
                            firstname,
                            lastname,
                            email,
                            hashPassword,
                            saltPassword,
                            username,
                        },
                    });

                    // Redirect to login page upon successful signup
                    set.redirect = '/auth/login'
                    return {
                        success: true,
                        message: "Account created. Redirecting to login...",
                        data: {
                            user: newUser,
                        },
                    };
                },
                {
                    body: t.Object({
                        firstname: t.String(),
                        lastname: t.String(),
                        email: t.String(),
                        username: t.String(),
                        password: t.String(),
                        familyCode: t.Optional(t.String()), // Make familyCode optional
                    }),
                }
            )
            .get('/home', async ({profile, set, request}: any): Promise<any> => {
                console.log('profile', profile);
                const userAgent = request.headers.get('user-agent') || '';

                if (isDesktop(userAgent)) {
                    console.log("here")
                    set.redirect = '/desktop';
                } else {
                    return (
                        <GuestLayout>
                            <HomeGuest/>
                        </GuestLayout>
                    )

                }
            })
            .get('/login',
                async (): Promise<string> => {
                    return (
                        <GuestLayout>
                            <Login/>
                        </GuestLayout>
                    )
                })
            .get('/family', async ({store, set, jwt, cookie: {auth},}: any): Promise<any> => {
                console.log("user", store.user)
                // The token is automatically verified and the decoded payload is available as `jwt`
                const profile = jwt.verify(auth.value);
                console.log('profile', profile);
                if (!profile) {
                    set.status = 401;
                    set.redirect = '/auth/login';
                    return;
                }
                return (
                    <GuestLayout>
                        <Family user={store.user} />
                    </GuestLayout>
                )
            })
            .get('/join-family', async ({store}: any): Promise<any> => {
                console.log('store', store)
                return (
                    <GuestLayout>
                        <JoinFamily/>
                    </GuestLayout>
                )
            })
            .post('join-family', async ({body, set, user, profile}: any) => {
                const {familyCode} = body;
                // validate family code
                const familyId = await getFamilyIdByCode(familyCode);
                if (!familyId) {
                    set.status = 400;
                    return {
                        success: false,
                        message: "Invalid family code",
                    };
                }

                console.log(user)

                    // update user family
                    await prisma.user.update({
                        where: {
                            userId: profile.userId,
                        },
                        data: {
                            familyId,
                        },
                    });
                    set.redirect = "/";
                return {
                    success: true,
                    message: "Family joined successfully",
                };

            },
            {
                body: t.Object({
                    familyCode: t.String(),
                }),
            })
            .get('create-family', async (): Promise<any> => {
                return (
                    <GuestLayout>
                        <CreateFamily/>
                    </GuestLayout>
                )
            })
            .post('/create-family', async ({body, set, profile}: any) => {
            try {
                const { familyName } = body;

                if (!familyName) {
                    set.status = 400;
                    return { success: false, message: 'Family name is required' };
                }

                if (!profile) {
                    set.status = 401;
                    return { success: false, message: 'Unauthorized' };
                }

                // Generate a unique family code
                const familyCode = faker.string.alphanumeric(8);

                // Create the family
                const family = await prisma.family.create({
                    data: {
                        name: familyName,
                        code: familyCode,
                    },
                });

                // Associate the family with the user
                const user = await prisma.user.update({
                    where: { userId: profile.userId },
                    data: { familyId: family.familyId },
                });

                // Update the store
                set.redirect = '/';
                return {
                    success: true,
                    message: 'Family created and associated successfully',
                    data: {
                        family,
                        user,
                    },
                };
            } catch (error) {
                console.error('Error creating family:', error);
                set.status = 500;
                return { success: false, message: 'Internal Server Error' };
            }
        }, {
            body: t.Object({
                familyName: t.String(),
            }),
        })
            .post('/logout', async ({cookie: {auth}, set}: any) => {
                auth.set({
                    value: "",
                    httpOnly: true,
                    maxAge: 0,
                    path: "/",
                });
                set.redirect = "/auth/home";
                return {
                    success: true,
                    message: "Account logout successfully",
                };
            })
    );
