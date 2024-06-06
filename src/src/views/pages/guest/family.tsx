import HxButton from "~/views/components/hx-buttton";
import HxLink from "~/views/components/hx-link";

export default function Family(props: {user: any}) {
console.log(props.user)
    return (
        <div class="h-screen flex flex-col justify-between items-center">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2 absolute top-0 mt-4"/>
            <div class="flex flex-col items-center justify-center flex-grow space-y-2 px-8">
                <div class="w-full flex justify-center">
                    <div class="text-lg text-center font-bold font-color-dark mb-8 px-2">
                        Il ne vous reste plus qu'une étape avant de pouvoir utiliser l'application !
                    </div>
                </div>
                <HxButton
                    method="get"
                    display="Rejoindre une famille"
                    url="/auth/join-family"
                    target="#home-guest"
                    swap="innerHTML"
                    bgColor="bg-purple"
                />
                <div id="create-family" class="mt-4 underline text-xs flex items-center justify-center">
                    <img src="/add_icon.png" alt="add icon" class="mr-2 mb-10"/>
                    <HxLink
                        method="get"
                        target="#home-guest"
                        swap="innerHTML"
                        url="/auth/create-family"
                        display="Créer une famille"
                    />
                </div>
            </div>
            <img src="/VIOLETTE_bonjour.png" alt="Violette Bonjour" class="fixed bottom-0 right-5 w-fit w-3/4"/>
        </div>
    )
}