import {Elysia} from "elysia";
import {isValidEmail} from "~/utils/auth";
import { generateIdFromEntropySize } from "lucia";

export const authRouter = new Elysia('/auth/', auth =>
    auth
    .post("/signup", async (request: Request) => {
        const formData = await request.formData();
        const email = formData.get("email");
        if (!email || typeof email !== "string" || !isValidEmail(email)) {
            return new Response("Invalid email", {
                status: 400
            });
        }
        const password = formData.get("password");
        if (!password || typeof password !== "string" || password.length < 6) {
            return new Response("Invalid password", {
                status: 400
            });
        }
        //TODO: add salt to hash
        const passwordHash = await Bun.hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        const userId = generateIdFromEntropySize(10); // 16 characters long

        try {
            await db.table("user").insert({
                id: userId,
                email,
                password_hash: passwordHash
            });

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                    "Set-Cookie": sessionCookie.serialize()
                }
            });
        } catch {
            // db error, email taken, etc
            return new Response("Email already used", {
                status: 400
            });
        }
    })
    .post("/login", async (request: Request) => {
        const formData = await request.formData();
        const email = formData.get("email");
        if (!email || typeof email !== "string") {
            return new Response("Invalid email", {
                status: 400
            });
        }
        const password = formData.get("password");
        if (!password || typeof password !== "string") {
            return new Response(null, {
                status: 400
            });
        }

        const user = await db.table("user").where("email", "=", email).get();

        if (!user) {
            // NOTE:
            // Returning immediately allows malicious actors to figure out valid emails from response times,
            // allowing them to only focus on guessing passwords in brute-force attacks.
            // As a preventive measure, you may want to hash passwords even for invalid emails.
            // However, valid emails can be already be revealed with the signup page
            // and a similar timing issue can likely be found in password reset implementation.
            // It will also be much more resource intensive.
            // Since protecting against this is non-trivial,
            // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
            // If emails/usernames are public, you may outright tell the user that the username is invalid.
            return new Response("Invalid email or password", {
                status: 400
            });
        }

        const validPassword = await verify(user.password_hash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return new Response("Invalid email or password", {
                status: 400
            });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
                "Set-Cookie": sessionCookie.serialize()
            }
        });
    }));

