import LoadingIndicator from "~/views/components/loading-indicator";
import HxBackLink from "~/views/components/hx-back-link";
import SignupForm from "~/views/components/authentication/signup-form";

export default function SignUp(): any {
    return (
        <div class="h-screen w-full ">
            <LoadingIndicator/>
            <div class={'w-full flex justify-center items-center'}>
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2 absolute top-0 mt-4"/>
            </div>
            <div class="mt-24 mx-5 flex flex-col justify-center items-center">
                <HxBackLink method="get" url="/auth/home" target="#home-guest" swap="innerHTML"/>
                <div class="bg-light w-full">
                    <SignupForm/>
                </div>
                <img src="/VIOLETTE_bonjour.png" alt="Violette Bonjour" class="fixed bottom-0 right-5 w-1/4"/>
            </div>
        </div>
    )
}