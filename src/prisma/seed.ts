import { PrismaClient } from "@prisma/client";
import UserSeed from "./seeder/userSeeder";
import FamilySeed from "./seeder/familySeeder";
import QuestionSeed from "./seeder/questionSeeder";
import ResponseSeed from "./seeder/responseSeeder";
import {faker} from "@faker-js/faker";
import {getUsersIdsByFamilyId} from "../src/utils/db";
import {hashPasswordFn} from "~/utils/bcrypt";

const prisma = new PrismaClient();

const main = async () => {
    try {
        // Clear existing data
        console.log("Removing previous data...");
        await prisma.user.deleteMany();
        await prisma.family.deleteMany();
        await prisma.question.deleteMany();
        await prisma.response.deleteMany();
        console.log("Previous data removed.");
        // seed test user luludegex
        const { hashPassword, saltPassword } = await hashPasswordFn("password");
        await prisma.user.create({
            data: {
                username: "luludegex",
                firstname: "Lucie",
                lastname: "Pelletier",
                email: "luludegex@gmail.com",
                hashPassword: hashPassword,
                saltPassword: saltPassword,
            },
        });
        await prisma.user.create({
            data: {
                username: "violette",
                firstname: "Violette",
                lastname: "Pelletier",
                email: "violette@gmail.com",
                hashPassword: hashPassword,
                saltPassword: saltPassword,
            },
        });

        await prisma.family.create({
            data: {
                code: "FAM024",
                name: "Violette",
            },
        });

        // Seed families
        const familySeed = new FamilySeed(4);

        // Loop through families to seed users and create families and users
        for (const family of familySeed.data) {
            // Number of users to create (3 to 6)
            const numberOfUsers = Math.floor(Math.random() * 4) + 3;
            console.log(`Seeding new family: '${family.name}' with ${numberOfUsers} users`);
            // Seed users for concerned family
            // Create users passwords
            const { hashPassword, saltPassword } = await hashPasswordFn("password");

            const userSeed = new UserSeed(numberOfUsers, hashPassword, saltPassword);
            // Creation of families an users
            await prisma.family.create({
                data: {
                    ...(family as any),
                    // Create associated users
                    User: {
                        create: userSeed.data,
                    },
                },
            });
        }
        console.log("Database has been seeded with families and users. 🚀");

        // Seed questions
        const questionSeed = new QuestionSeed(4);
        console.log(questionSeed);

        // Create questions
        for (const question of questionSeed.data) {
            await prisma.question.create({
                data: {
                    ...(question as any),
                }
            })
        }

        // seed demo question
        await prisma.question.create({
            data: {
                question: "Quel est votre plat préféré ?",
                createdAt: new Date(),
            }
        })
        // Get all questions
        const allQuestions = await prisma.question.findMany();
        console.log("All questions:", allQuestions);

        // Loop trough questions to create associated answers
        for (const question of allQuestions) {
            // Get all families
            const allFamilies = await prisma.family.findMany()
            console.log("All families:", allFamilies);
            // Loop trough families
            for (const family of allFamilies ) {
                // Get users in the family
                const familyUsers = await getUsersIdsByFamilyId(family.familyId);
                console.log("Family users:", familyUsers);
                // Choose number of user to answer the question in the family
                const percentageOfAnswer = 0.5;
                const nbAnsweringUsers =  Math.ceil( percentageOfAnswer * familyUsers.length);
                // Randomly select the nb of users
                const answeringUsersIds = faker.helpers.arrayElements(familyUsers, nbAnsweringUsers);
                console.log("Answering users:", answeringUsersIds);
                const responseSeed = new ResponseSeed(nbAnsweringUsers, answeringUsersIds, question.questionId)
                // Create the responses
                for (const response of responseSeed.data) {
                    console.log("Response", response);
                    await prisma.response.create({
                        data: {
                            ...(response as any),
                        }
                    })
                }
            }
        }
        console.log("Database has been seeded with questions and responses. 🚀");
    } catch (e) {
        // Handle errors
        console.error("Error during seeding:", e);
    } finally {
        // Ensure Prisma client is disconnected
        await prisma.$disconnect();
    }
};

console.log("Database seeding starting...");
// Execute the seeding script
await main();