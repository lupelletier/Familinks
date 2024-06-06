import LoadingIndicator from "~/views/components/loading-indicator";
import HxBackLink from "~/views/components/hx-back-link";
import JoinFamilyForm from "~/views/components/authentication/join-family-form";
import CreateFamilyForm from "~/views/components/authentication/create-family-form";

export default function CreateFamily(): any {
    return (
        <div class="h-screen w-full ">
            <LoadingIndicator/>
            <div class={'w-full flex justify-center items-center'}>
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2 absolute top-0 mt-4"/>
            </div>
            <div class="mt-24 mx-5 flex flex-col justify-center items-center">
                <HxBackLink method="get" url="/auth/family" target="#home-guest" swap="innerHTML"/>
                <div class="bg-light w-full mt-4">
                    <CreateFamilyForm />
                </div>
                <div
                    class="w-full py-3 flex items-center text-sm font-color-dark before:flex-1 before:border-t before:me-6 after:flex-1 after:border-t after:ms-6 before:border-neutral-600 after:border-neutral-600">
                    ou
                </div>
                <img src="/violette_bonjour.png" alt="Violette Bonjour" class="fixed bottom-0 right-5 w-fit"/>
            </div>
        </div>
    )
}