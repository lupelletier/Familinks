// Get users id by family id (for seeding)
import {prisma} from "~/index";

export const getDailyQuestion = async () => {
    const today = new Date();

    const getQuestion = await prisma.question.findFirst({
        where: {
            createdAt: {
                gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
            }
        }
    })
    return getQuestion ? getQuestion : "No question for today";
}

export const userAnsweredQuestion = async (userId: number, questionId: number) => {
    const response = await prisma.response.findFirst({
        where: {
            userId: userId,
            questionId: questionId
        }
    })
    return !!response;
}

export const getFamilyByFamilyId = async (familyId: number) => {
    return prisma.family.findUnique({
        where: {
            familyId: familyId
        }
    });
}

export const getDailyAnswer = async (user: any, question: any) => {
    return prisma.response.findFirst({
        where: {
            userId: user.userId,
            questionId: question.questionId
        }
    });
}



export async function getAllAnswers(questionId: number) {
    return prisma.response.findMany({
        where: { questionId },
        include: { user: true },
    });
}

export async function getUserDailyAnswer(userId: number, questionId: number) {
    return prisma.response.findFirst({
        where: { userId, questionId },
    });
}
