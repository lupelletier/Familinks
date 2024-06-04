import HxLink from "~/views/components/hx-link";
import HxButton from "~/views/components/hx-buttton";

export default function HomeGuest(): any {
    return (
        <div class="h-screen flex flex-col justify-between items-center">
            <div class="flex flex-col items-center justify-center flex-grow">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="mb-8"/>
                <HxButton method="get" display="Je me connecte" url="/auth/login" target="#home-guest" swap="innerHTML"
                          bgColor="bg-purple"/>
                <div id="signup" class="mt-4 underline">
                    <HxLink method="get" target="#home-guest" swap="innerHTML" url="/auth/signup" display="Je m'inscris"/>
                </div>
            </div>
            <img src="/VIOLETTE_bonjour.png" alt="Violette Bonjour" class="fixed bottom-0 w-3/4"/>
        </div>
    );
}
