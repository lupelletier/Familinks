import { Elysia } from 'elysia';

import { logger } from '~/utils/logger';

//import { getCount } from '~/services/statistics';

import MainLayout from '~/views/layouts/main';
import Experimental from '~/views/pages/home';

import ErrorMessage from '~/views/components/error-message';

export const pageRouter = new Elysia()
  .onError(({ error, set }) => {
    logger.error(error);

    set.status = 200;
    return <ErrorMessage />;
  })
  .get('/', async () => {
    //const count = await getCount();

    return (
      <MainLayout>
        <Experimental />
      </MainLayout>
    )
  });
