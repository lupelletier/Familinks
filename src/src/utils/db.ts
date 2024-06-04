import { PrismaClient } from '@prisma/client';

import { logger } from './logger';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
})

prisma.$on('warn', (e) => {
  logger.warn(e)
})

prisma.$on('info', (e) => {
  logger.info(e)
})


prisma.$on('error', (e) => {
  logger.error(e)
})

// Get users by family name
export const getUsersByFamilyName = async (name: string) => {
  await prisma.user.findMany({
    where: {
      family: {
        name: name,
      },
    },
  });
}

// Get users id by family id (for seeding)
export const getUsersIdsByFamilyId = async (id: number) => {
   const getUsers = await prisma.user.findMany({
    where: {
      family: {
        familyId: id,
      }
    }
  })
  console.log(getUsers);
   const users: any = [];
    getUsers.forEach((user)=> {
       users.push(user.userId);
    });
  return users;
}

// Get users id by family id
export const getUsersByFamilyId = async (id: number) => {
    return prisma.user.findMany({
        where: {
            family: {
                familyId: id,
            }
        }
    })
}

// Get all families
export const getAllFamilies = async () => {
    return prisma.family.findMany();
}


// Get family id by code
export const getFamilyIdByCode = async (code: string):Promise<number> => {
    const getFamily = await prisma.family.findUnique({
        where: {
            code: code,
        }
    })
    return getFamily ? getFamily.familyId : 0;
}

// Get user answer by user id and question id
export const getUserDailyAnswer = async (userId: number, questionId: number) => {
    return prisma.response.findFirst({
        where: {
            userId: userId,
            questionId: questionId
        }
    });
}