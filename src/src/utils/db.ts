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
  const users = await prisma.user.findMany({
    where: {
      family: {
        name: name,
      },
    },
  });
  return  users;
}

// Get users by family id
export const getUsersByFamilyId = async (id: number) => {
  const users = await prisma.user.findMany({
    where: {
      family: {
        id_family: id,
      }
    }
  })
  return users;
}

// Get Family by user id
export const getFamilyByUserId = async (id: number) => {
  const family = await prisma.family.findUnique({
    where: {
     id_family: id,
    }
  })
  return family;
}


// Get users count
export const getUsersCount = async () => {
  const users = await prisma.user.findMany();
  return users.length;
}

// Get all families
export const getAllFamilies = async () => {
  const families = await prisma.family.findMany();
  return families;
}

