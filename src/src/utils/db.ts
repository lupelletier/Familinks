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

// Get users by family id
export const getUsersByFamilyId = async (id: number) => {
   const getUsers = await prisma.user.findMany({
    where: {
      family: {
        familyId: id,
      }
    }
  })
  console.log(getUsers);
   const users = [];
    getUsers.forEach((user)=> {
       users.push(user.userId);
    });
  return users;
}

// Get Family by user id
export const getFamilyByUserId = async (id: number) => {
  await prisma.family.findUnique({
    where: {
     familyId: id,
    }
  })
}

// Get users count
export const getUsersCount = async () => {
  const users = await prisma.user.findMany();
  return users.length;
}

// Get all families
export const getAllFamilies = async () => {
  await prisma.family.findMany();
}