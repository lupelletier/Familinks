import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

import { PrismaClient } from "@prisma/client";

import UserSeed from "./data/userSeeder";
import FamilySeed from "./data/familySeeder";

const prisma = new PrismaClient();
const printArray = (array: any[]) => { for (const element of array) { if (element instanceof Array) { printArray(element); } else { console.log(element); } } }

const main = async () => {
  try {
    console.log('Removing previous data...')
    await prisma.user.deleteMany();
    await prisma.family.deleteMany();
    await prisma.question.deleteMany();
    await prisma.response.deleteMany();

    console.log('Previous data removed.')

    const familySeed = new FamilySeed(10);

    for (const family of familySeed.data) {
      const numberOfUsers = Math.floor(Math.random() * 10) + 1;
      console.log("Seeding new family: '" + family.name + "' with " + numberOfUsers + " users")
      const userSeed = new UserSeed(numberOfUsers, family.id_family);
      await prisma.family.create({
        data: {
          ...(family as any),
          User: {
            create: userSeed.data,
          },
        },
      });
    }
    console.log(`Database has been seeded. 🚀`);
  } catch (e) {
    throw e;
  }
}

console.log(`Database seeding starting...`);
await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
