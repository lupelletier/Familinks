import Badge from "~/views/components/badge";
import {getFamilyByFamilyId, userAnsweredQuestion} from "~/services/daily";
import AnswerComponent from "~/views/components/answer-component";
import {getUsersByFamilyId} from "~/utils/db";
import HxButton from "~/views/components/hx-buttton";
import HomeGuest from "~/views/pages/guest/home";

export default async function Home(props: { user: any, question: any }) {
    const userAnswered = await userAnsweredQuestion(props.user.userId, props.question.questionId);
    const family = await getFamilyByFamilyId(props.user.familyId);
    const familyUsers = await getUsersByFamilyId(props.user.familyId);
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2">
                        <Badge name="Question du jour"/>
                    </div>
                    <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                </div>

                <div class="flex justify-between items-center px-2 font-bold font-color-dark">
                    Famille {family?.name}
                </div>
                <p class="text-sm font-semibold px-2 py-2">{props.question.question}</p>
                <div class="flex flex-col items-center justify-between bg-lila rounded-2xl m-2">
                    <div class="flex flex-col items-center p-3">
                        {familyUsers.map((user: any) => {
                            return (
                                <AnswerComponent user={user} question={props.question} currentUserId={props.user.userId}/>
                            )
                        })}
                    </div>
                     <div class="mb-10">
                         {userAnswered ?
                             null : (
                             <HxButton method="get" url="/answer-question" target="#home-auth" swap="innerHTML" display="Répondre à la question" bgColor="bg-purple"/>
                            )
                         }
                     </div>
                </div>
            </div>
        </div>
    );
}
