import { Elysia } from 'elysia';
import { logger } from "~/utils/logger";
import GuestLayout from "~/views/layouts/guest";

export function deviceDetectionMiddleware() {
    return new Elysia().on('beforeHandle', async ({ request, set }: any) => {
        const userAgent = request.headers.get('user-agent') || '';
        logger.info(
            `Handling request: ${request.method} ${request.url} - ${request.headers.get('user-agent')}`
        );
        console.log('user agent');
        if (!isMobile(userAgent)) {
            set.status = 403; // Forbidden status
            return (
                <GuestLayout>
                    <h1 class="text-3xl font-bold text-red-600 mb-4">Oups !</h1>
                    <p class="text-lg text-gray-700 mb-6">Notre application n'est actuellement pas disponible sur ordinateur.</p>
                    <p class="text-lg text-gray-700">Veuillez essayer d'y accéder depuis votre appareil mobile.</p>
                    <p class="text-sm text-gray-500 mt-2">Nous espérons vous y voir !</p>
                    <div class="mt-6"></div>
                </GuestLayout>
            );
        }
    });
}

function isMobile(userAgent: string): boolean {
    console.log("here");
    const mobileRegex = /Mobile|Android|iP(ad|hone)/i;
    return mobileRegex.test(userAgent);
}
