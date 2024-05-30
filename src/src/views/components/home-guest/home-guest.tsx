import HxButton from "~/views/components/hx-buttton";
import HxLink from "~/views/components/hx-link";

export default function HomeGuestComponent(): any {
    return (
        <div id="home-guest" class="h-screen flex flex-col justify-between items-center">
            <div class="flex flex-col items-center justify-center flex-grow">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="mb-8"/>
                <HxButton method="get" display="Je me connecte" url="/auth/login" target="#home-guest" swap="innerHTML"
                          bgColor="bg-purple"/>
                <div id="signup" class="mt-4">
                    <HxLink url="/auth/signup" display="Créer"/>
                </div>
            </div>
            <img src="/violette_bonjour.png" alt="Violette Bonjour" class="fixed bottom-0 w-fit"/>
        </div>
    )
}