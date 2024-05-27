import jwt from "@elysiajs/jwt";

export async function validateSession(auth: string): Promise<boolean> {

    console.log('Session:', auth)

    console.log(auth === 'valid')
    return auth === 'valid';
}