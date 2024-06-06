import { prisma } from "~/index";
import jwt from "@elysiajs/jwt";

export const authMiddleware = () => {
    return async ({ jwt, set, cookie: { auth }, store }: any) => {
        if (!auth?.value) {
            set.status = 401;
            set.redirect = '/auth/login';
            return null;
        }

        try {
            const profile = await jwt.verify(auth.value, 'secret'); // Ensure to use your secret key
            if (!profile) {
                set.status = 401;
                set.redirect = '/auth/login';
                return null;
            }

            // Fetch user details based on the profile
            const user = await prisma.user.findUnique({
                where: { userId: profile.userId },
            });

            if (!user) {
                set.status = 404;
                set.redirect = '/auth/login';
                return null;
            }

            return { profile, user };
        } catch (error) {
            console.error('Error during authentication', error);
            set.status = 401;
            set.redirect = '/auth/login';
            return null;
        }
    };
};
