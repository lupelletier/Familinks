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

export const authRouter = (app: Elysia) =>
    app.group("/auth", (app) =>
        app
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
                async ({body, set}: any) => {
                    const {email, firstname, lastname, password, username, familyCode} = body;
                    // validate duplicate email address
                    const emailExists = await prisma.user.findUnique({
                        where: {
                            email,
                        },
                        select: {
                            userId: true,
                        },
                    });
                    if (emailExists) {
                        // Email already exists in the database
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Email address already in use.",
                        };
                    }

                    // validate duplicate username
                    const usernameExists = await prisma.user.findUnique({
                        where: {
                            username,
                        },
                        select: {
                            userId: true,
                        },
                    });
                    const familyCodeExists = await getFamilyIdByCode(familyCode);
                    if (!familyCodeExists) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Invalid family code.",
                        };
                    }

                    if (usernameExists) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: "Someone already taken this username.",
                        };
                    }

                    // handle password
                    const {hashPassword, saltPassword} = await hashPasswordFn(password);
                    const familyId: number = await getFamilyIdByCode(familyCode);

                    const newUser = await prisma.user.create({
                        data: {
                            firstname,
                            lastname,
                            email,
                            hashPassword,
                            saltPassword,
                            username,
                            familyId,
                        },
                    });

                    return {
                        success: true,
                        message: "Account created",
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
                        familyCode: t.String(),
                    }),
                }
            )
            .get('/home', async (): Promise<any> => {
                return (
                    <GuestLayout>
                        <HomeGuest/>
                    </GuestLayout>
                )
            })
            .get('/login',
                async (): Promise<string> => {
                    return (
                        <GuestLayout>
                            <Login/>
                        </GuestLayout>
                    )
                })
            .post(
                "/login",
                async ({jwt, set, cookie: {auth}, body, store}: any) => {
                    const {username, password} = body;
                    // verify email/username
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                {
                                    email: username,
                                },
                                {
                                    username,
                                },
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

                    // generate access
                    const accessToken = await jwt.sign({
                        userId: user.userId,
                    });
                    auth.set({
                        value: accessToken,
                        httpOnly: true,
                        maxAge: 15 * 60, // 15 minutes
                        path: "/",
                    });
                    store.user = user;
                    console.log(user.familyId)
                    user.familyId === null ? set.redirect = "/auth/family" : set.redirect = "/";
                    set.redirect = "/";
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
            .post('join-family', async ({body, set, store, jwt, cookie: {auth}}: any) => {
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

                const user = store.user;
                console.log(user)
                if(!user.familyId) {
                    const profile = await jwt.verify(auth.value);
                    console.log('profile', profile);

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
                }

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
            .post('/create-family', async ({body, set, store, jwt, cookie: {auth}}: any) => {
            try {
                const { familyName } = body;

                if (!familyName) {
                    set.status = 400;
                    return { success: false, message: 'Family name is required' };
                }

                const profile = await jwt.verify(auth.value);
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
                store.user = user;
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
            .get('/logout', async ({cookie: {auth}, set}: any) => {
                auth.set({
                    value: "",
                    httpOnly: true,
                    maxAge: 0,
                    path: "/",
                });
                return {
                    success: true,
                    message: "Account logout successfully",
                };
            })
    );
