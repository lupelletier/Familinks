import {Elysia, t} from 'elysia';

import {swagger} from "@elysiajs/swagger";

import {logger} from '~/utils/logger';


import AlertMessage from '~/views/components/alert-message';
import MyButton from '~/views/components/sleep-button';
import FamiliesTable from '~/views/components/families-table';
import UsersTable from '~/views/components/users-table';

import {getAllFamilies, getUsersByFamilyId} from '~/utils/db'
import {prisma} from "~/index";
import {getDailyQuestion} from "~/services/daily";

export const apiRouter = new Elysia().group('/api', app =>
  app
    .onError(({ code, error }) => {
      logger.error(error);

      return {
        code,
        message: error.message,
      };
    })
    .use(swagger())
      .post('/answer-question', async ({body, store, set}:any) => {
            const question = await getDailyQuestion();
            if (store.user) {
                try {
                    await prisma.response.create({
                        data: {
                            userId: store.user.userId,
                            questionId: question.questionId,
                            response: body.response,
                        },
                    });
                } catch (error) {
                    console.error('Error during response creation', error);
                    return {
                        code: 500,
                        message: 'Error during response creation',
                    };
                }
                set.redirect = '/';
            }

      })
      .post('/profile/update', async ({body, store, set}:any) => {
            if (store.user) {
                try {
                    store.user = await prisma.user.update({
                        where: {
                            userId: store.user.userId,
                        },
                        data: {
                            email: body.email,
                            username: body.username,
                        },
                    });
                    console.log('User updated');
                    set.redirect = '/';
                } catch (error) {
                    console.error('Error during user update', error);
                    return {
                        code: 500,
                        message: 'Error during user update',
                    };
                }

            }
        }
    )
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
                t.Object({
                id: t.Numeric()
            })
            return <UsersTable users={await getUsersByFamilyId(Number(params.id))} />
  })
);
