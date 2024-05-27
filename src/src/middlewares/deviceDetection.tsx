import { Elysia } from 'elysia';
import {logger} from "~/utils/logger";
import ErrorMessage from "~/views/components/error-message";

export function deviceDetectionMiddleware() {
    return new Elysia().on('beforeHandle', async ({ request, response }) => {
        const userAgent = request.headers.get('user-agent') || '';
        logger.info(
            `Handling request: ${request.method} ${request.url} - ${request.headers.get('user-agent')}`
        );
        console.log('User agent:', userAgent)
        if (!isMobile(userAgent)) {
            return <ErrorMessage message={'Only mobile devices are supported'} />
        }
    });
}

function isMobile(userAgent: string): boolean {
    const mobileRegex = /Mobile|Android|iP(ad|hone)/i;
    return mobileRegex.test(userAgent);
}
