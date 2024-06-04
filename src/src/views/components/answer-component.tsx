import {getDailyAnswer, userAnsweredQuestion} from "~/services/daily";
import {getUserDailyAnswer} from "~/utils/db";

export default async function AnswerComponent(props: {currentUserId: number, user: any, question: any }) {
    const dailyAnswer = await getUserDailyAnswer(props.user.userId, props.question.questionId);
    console.log(dailyAnswer);

    const isCurrentUser = props.currentUserId === props.user.userId;
    console.log(props.currentUserId);

    const currentUserAnswered = await userAnsweredQuestion(props.currentUserId, props.question.questionId);
    console.log(currentUserAnswered);
    return (
        dailyAnswer ? (
                isCurrentUser ? (
                    <div class="flex items-center justify-end bg-lila rounded-md m-2 w-full">
                        <div class="flex items-start justify-between">
                            <div class="mx-3 flex flex-col items-end">
                                <p class="text-xs font-semibold pb-1 ">
                                    {props.user.username}
                                </p>
                                <p class={`text-xs bg-light p-2 rounded-md ${!currentUserAnswered ? 'blur-sm' : ''}`}>
                                    {dailyAnswer?.response}
                                </p>
                            </div>
                                <img src="/violette_happy_2.png" alt="user icon" class="w-10 rounded-full bg-green"/>
                        </div>
                    </div>
                ) : (
                    <div class="flex flex-col items-center bg-lila rounded-md m-2 w-full">
                        <div class="flex items-start justify-between">
                                <img src="/violette_happy_2.png" alt="user icon" class="w-10 bg-green rounded-full"/>
                            <div class="mx-3 flex flex-col">
                                <p class="text-xs font-semibold pb-1">
                                    {props.user.username}
                                </p>
                                <p class={`text-xs bg-light p-2 rounded-md ${!currentUserAnswered ? 'blur-sm' : ''}`}>
                                    {dailyAnswer?.response}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            ) :
            (
                <div>

                </div>
            )
        )
}
