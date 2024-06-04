import {getDailyAnswer} from "~/services/daily";
import {getUserDailyAnswer} from "~/utils/db";

export default async function AnswerComponent(props: { user: any, question: any }) {
    const dailyAnswer = await getUserDailyAnswer(props.user.userId, props.question.questionId);
    console.log(dailyAnswer);
    return (
        dailyAnswer ? (
        <div class="flex flex-col items-center bg-lila rounded-md m-2">
            <div class="flex items-start justify-between">
                <div class="rounded-full bg-green  text-sm font-medium font-color-light ">
                    <img src="/violette_happy_2.png" alt="user icon"/>
                </div>
                <div class="text-sm  mx-3 flex flex-col">
                    <p class="text-sm pb-1">
                        {props.user.username}
                    </p>
                    <p class="text-xs bg-light p-2 rounded-md">
                        {dailyAnswer.response}
                    </p>
                </div>
            </div>
        </div>
        ) : (
            <div>

            </div>
        )
    )
}
