import Badge from "~/views/components/badge";
import AnswerComponent from "~/views/components/answer-component";
import HxButton from "~/views/components/hx-buttton";
import ParametersButton from "~/views/components/button-parameters";

export default function Parameters(){
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2">
                        <Badge name="Paramètres"/>
                    </div>
                    <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                </div>
                <div class="flex flex-col items-start justify-between bg-lila rounded-2xl m-2">

                    <div class="flex flex-col items-center justify-evenly p-3 space-y-4 w-full">
                        <ParametersButton icon={'fa-users-line'} display={'Accessibilité'} url={'/'}></ParametersButton>
                        <ParametersButton icon={'fa-users-line'} display={'À propos'} url={'/'}></ParametersButton>
                        <ParametersButton icon={'fa-users-line'} display={'Déconnection'} url={'/auth/logout'}></ParametersButton>
                    </div>
                </div>
            </div>
        </div>
    )
}