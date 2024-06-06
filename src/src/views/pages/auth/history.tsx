import Badge from "~/views/components/badge";
import UserComponent from "~/views/components/user-component";

export default function QuestionHistory() {
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2">
                        <Badge name="Historique"/>
                    </div>
                    <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                </div>
            </div>
            <div class="flex flex-col items-start justify-between bg-lila rounded-2xl mt-10 m-2 p-3">
               <p class="text-sm font-semibold px-2 py-2">
                   Pas encore de réponses !
               </p>
            </div>
        </div>
    )
}