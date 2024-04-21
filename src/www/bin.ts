import { logger } from '~/utils/logger';

import { app } from '~/index';

app.listen({ port: Bun.env.PORT ?? 3000, hostname: Bun.env.HOSTNAME ?? 'localhost' })
logger.info(`Server is running at http://${app.server?.hostname}:${app.server?.port}`);
