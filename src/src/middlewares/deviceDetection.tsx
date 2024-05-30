import { Elysia } from 'elysia';
import {logger} from "~/utils/logger";
import GuestLayout from "~/views/layouts/guest";

export function deviceDetectionMiddleware() {
    return new Elysia().on('beforeHandle', async ({ request, response }) => {
        const userAgent = request.headers.get('user-agent') || '';
        logger.info(
            `Handling request: ${request.method} ${request.url} - ${request.headers.get('user-agent')}`
        );
        console.log('User agent:', userAgent)
        if (!isMobile(userAgent)) {
            return (
                <GuestLayout>
                    <img src='/LOGOS-BLACK.png' alt='violette' />
                </GuestLayout>
            );
        }
    });
}

function isMobile(userAgent: string): boolean {
    const mobileRegex = /Mobile|Android|iP(ad|hone)/i;
    return mobileRegex.test(userAgent);
}