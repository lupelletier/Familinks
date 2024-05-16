import { Elysia } from 'elysia';
import { logger } from '~/utils/logger';
import MainLayout from '~/views/layouts/main';

import ErrorMessage from '~/views/components/error-message';
import Home from "~/views/pages/home";
import {staticPlugin} from "@elysiajs/static";
import {Html} from "@elysiajs/html";

export const pageRouter = new Elysia()
  .onError(({ error, set }): JSX.Element => {
    logger.error(error);

    set.status = 200;
    return <ErrorMessage />;
  })
  .get('/', async (): Promise<any> => {
      return (
          <MainLayout>
            <Home/>
          </MainLayout>
      );
  })
