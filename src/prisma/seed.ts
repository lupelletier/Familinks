import { PrismaClient } from "@prisma/client";
import UserSeed from "./data/userSeeder";
import FamilySeed from "./data/familySeeder";
import QuestionSeed from "./data/questionSeeder";
import ResponseSeed from "./data/responseSeeder";
import {faker} from "@faker-js/faker";
import {getUsersByFamilyId, getUsersByFamilyName} from "~/utils/db";

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

    const families = new FamilySeed(4);

    const questions = new QuestionSeed(2);

    for (const family of families.data) {
      const numberOfUsers = Math.floor(Math.random() * 4) + 3;
      console.log("Seeding new family: '" + family.name + "' with " + numberOfUsers + " users")
      const users = new UserSeed(numberOfUsers, family.id_family);
      await prisma.family.create({
        data: {
          ...(family as any),
          User: {
            create: users.data,
          },
        },
      });
    }

    for (const question of questions.data) {
      const responses = new ResponseSeed(1, families.data);
      console.log(question);
      await prisma.question.create({
        data: {
          ...(question as any),
          Response: {
            create: responses.data
          }
        },
      });

       /* await prisma.question.update({
          where: {
            id_question: question.id_question
          },
          data: {
            ...(question as any),
            Response: {
              connect: response.data,
            },
          }*/
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