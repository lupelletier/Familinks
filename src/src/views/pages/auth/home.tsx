import Badge from "~/views/components/badge";
import {getFamilyByFamilyId, userAnsweredQuestion} from "~/services/daily";
import AnswerComponent from "~/views/components/answer-component";
import {getUsersByFamilyId} from "~/utils/db";

export default async function Home(props: { user: any, question: any }) {
    console.log('user', props.user);
    console.log('question', props.question)
    const userAnswered = await userAnsweredQuestion(props.user.userId, props.question.questionId);
    console.log('userAnswered', userAnswered);
    const family = await getFamilyByFamilyId(props.user.familyId);
    console.log('family', family);

    const familyUsers = await getUsersByFamilyId(props.user.familyId);
    console.log('familyUsers', familyUsers);

    return (
        <div class="h-screen w-full flex flex-col items-center">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full pt-5">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2">
                        <Badge name="Question du jour"/>
                    </div>
                    <img src='/violette_happy_1.png' alt="violette happy"/>
                </div>

                <div class="flex justify-between items-center px-2 font-bold font-color-dark">
                    Famille {family?.name}
                </div>
                <p class="text-sm font-semibold px-2 py-2">{props.question.question}</p>


                <div class="flex flex-col items-center bg-lila rounded-md m-2">
                    {userAnswered ? (
                        <div>
                            user aswered
                        </div>

                        ) : (
                        <div class="flex flex-col items-center p-3">
                            {familyUsers.map((user: any) => {
                                console.log('user', user);
                                return (
                                    <AnswerComponent user={user} question={props.question}/>
                                )
                            })
                            }
                            <div id="answer" class="flex flex-col items-center w-full pt-5 pb-0.5">
                                <button hx-post={"/api/answer"} hx-indicator="#loading-indicator" hw-swap="afterbegin"
                                        type="submit"
                                        class="ml-2 rounded-full bg-purple border p-2.5 text-sm font-medium font-color-light focus:outline-none focus:ring-1 focus:ring-white">
                                    Répondre à la question
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
