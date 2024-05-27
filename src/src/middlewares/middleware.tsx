// Middleware to check if the user is authenticated
import ErrorMessage from "~/views/components/error-message";
import jwt from "@elysiajs/jwt";

export async function authMiddleware({jwt, set, cookie: { auth } }: any, next: Function) {
    console.log(auth?.session);
    if (!auth?.value) {
        set.status = 401;
        return <ErrorMessage message={'You are not connected'} />;
    }

    try {

        const profile = await jwt.verify(auth.value, 'your_jwt_secret_key'); // Ensure to use your secret key
        if (!profile) {
            set.redirect = '/auth/login';
            return;
        }
        // Attach the profile to the request context if needed
        set.profile = profile;
        await next();
    } catch (error) {
        set.status = 401;
        set.redirect = '/auth/login';
    }
};
