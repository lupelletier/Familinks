import { Elysia, t } from 'elysia';

import { swagger } from "@elysiajs/swagger";

import { logger } from '~/utils/logger';


import AlertMessage from '~/views/components/alert-message';
import MyButton from '~/views/components/sleep-button';
import FamiliesTable from '~/views/components/families-table';
import UsersTable from '~/views/components/users-table';

import {getAllFamilies, getUsersByFamilyId, getUsersByFamilyName} from '~/utils/db'

export const apiRouter = new Elysia().group('/api', app =>
  app
    .onError(({ code, error }) => {
      logger.error(error);

      return {
        code,
        message: error.message,
      };
    })
/*    .use(swagger({
      version: '0.0.1',
      path: '/swagger',
    })
    )*/
    .post(
      '/sleep/:duration',
      async ({ params: { duration } }) => {
        // Sleeping for the given duration
        await new Promise(f => setTimeout(f, parseInt(duration) * 1000));
        return (
          <>
            <MyButton value={String(Math.floor(Math.random() * 5 + 1))} />
            <AlertMessage message={'I had a good sleep for ' + duration + ' seconds!'} />
          </>
        )
      }
    )
    .get(
      '/families',
      async () => {
        return (
          <FamiliesTable families={await getAllFamilies()} />
        )
      }
    )
    .get('/families/:id/users',
        async({ params }) =>
            {
                params: t.Object({
                id: t.Numeric()
            })
            return <UsersTable users={await getUsersByFamilyId(Number(params.id))} />
  })
);
