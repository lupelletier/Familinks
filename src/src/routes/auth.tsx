import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import {getFamilyIdByCode} from "~/utils/db";
import {comparePassword, hashPasswordFn} from "~/utils/bcrypt";
import {prisma} from "~/index";
import MainLayout from "~/views/layouts/main";
import Login from "~/views/pages/guest/login";
import HomeGuest from "~/views/pages/guest/home";
import GuestLayout from "~/views/layouts/guest";
import HomeGuestComponent from "~/views/components/home-guest/home-guest";

export const authRouter = (app: Elysia) =>
    app.group("/auth", (app) =>
        app
            .use(
                jwt({
                    name: "jwt",
                    /*secret: Bun.env.JWT_SECRET!*/
                    secret: 'jwt_secret_key'
                })
            )
            .get('/signup', async () => {
                    return (
                        <MainLayout>
                            <SignUp/>
                        </MainLayout>
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
                    return {
                        success: true,
                        data: user,
                        message: "Account login successfully",
                    };
                },
                {
                    body: t.Object({
                        username: t.String(),
                        password: t.String(),
                    }),
                }
            )
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
