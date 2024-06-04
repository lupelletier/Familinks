import Badge from "~/views/components/badge";
import AnswerComponent from "~/views/components/answer-component";
import HxButton from "~/views/components/hx-buttton";
import {getFamilyByFamilyId} from "~/services/daily";
import AnswerForm from "~/views/components/answer-form";
import HxBackLink from "~/views/components/hx-back-link";

export default async function AnswerQuestion(props: { user: any, question: any }) {
    const family = await getFamilyByFamilyId(props.user.familyId)
    return (
        <div class="h-screen w-full flex flex-col items-center">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full pt-5">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2 flex flex-col items-start">
                            <HxBackLink method="get" url="/" target="#home-auth" swap="innerHTML" style="left-0 underline pb-2"/>
                        <Badge name="Question du jour"/>
                    </div>
                    <img src='/violette_happy_1.png' alt="violette happy"/>
                </div>
                <div class="flex justify-between items-center px-2 font-bold font-color-dark">
                    Famille {family?.name}
                </div>
                <div class="flex flex-col items-center bg-lila rounded-md m-2 mt-8">
                    <AnswerForm user={props.user} question={props.question}/>
                </div>
            </div>
        </div>
    )
}