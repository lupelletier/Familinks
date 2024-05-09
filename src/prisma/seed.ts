import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

import { PrismaClient } from "@prisma/client";

import UserSeed from "./data/userSeeder";
import FamilySeed from "./data/familySeeder";
import QuestionSeed from "./data/questionSeeder";
import ResponseSeed from "./data/responseSeeder";
import {faker} from "@faker-js/faker";
import { getUsersByFamilyId } from "~/utils/db";

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

    const families = new FamilySeed(2);

    const questions = new QuestionSeed(10);

    for (const family of families.data) {
      const numberOfUsers = Math.floor(Math.random() * 10) + 1;
      console.log("Seeding new family: '" + family.name + "' with " + numberOfUsers + " users")
      const users = new UserSeed(numberOfUsers, family.id_family);
      const families = await prisma.family.create({
        data: {
          ...(family as any),
          User: {
            create: users.data,
          },
        },
      });
    }

    for (const question of questions.data) {
      console.log(question);
      for( const family of families.data ) {
        const familyUsers = await getUsersByFamilyId(family.id_family);
        const nbAnswers = Math.ceil(0.8 * familyUsers.length);
        console.log(nbAnswers);
        // const usersThatAnswered = new Set<number>();
        // console.log(usersThatAnswered);
        let attempts = 0;
        console.log(attempts);
          //while (usersThatAnswered.size < nbAnswers && attempts < familyUsers.length * 2) {
            const randomUser = faker.helpers.arrayElement(familyUsers);
           // console.log(randomUser);
           // if (!usersThatAnswered.has(randomUser.id_user)) {
           //   usersThatAnswered.add(randomUser.id_user);

              const response = new ResponseSeed(1, randomUser, family)

              await prisma.question.create({
                  data: {
                    ...(question as any),
                    Response: {
                      create: response.data,
                    },
                  }
              });
            }
//            attempts++;
          }
        //}
    //}
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