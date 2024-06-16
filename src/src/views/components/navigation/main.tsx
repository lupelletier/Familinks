export default function MainNavigation(): any {
    return (
        <div class="fixed bottom-0 left-0 w-full bg-light text-white p-4 flex justify-between items-center rounded-t-xl custom-shadow">
            <div class="flex justify-around items-center w-full" hx-target="#home-auth">
                <a hx-get="/tree" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex flex-col justify-center items-center w-full py-2 font-color-dark hover:bg-gray-200 hover:rounded-lg  transition duration-200 ease-in-out">
                    <img src="/ARBRE_GENEALOGIQUE.png" alt="arbre généalogique" class="w-6 "/>
                    <p class="text-xs mt-1">Famille</p>
                </a>
                <a hx-get="/history" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex flex-col justify-center items-center w-full py-2 font-color-dark hover:bg-gray-200 hover:rounded-lg transition duration-200 ease-in-out">
                    <img src="/HISTORIQUE.png" alt="historique" class="w-6"/>
                    <p class="text-xs mt-1">Historique</p>
                </a>
                <a hx-get="/" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex flex-col justify-center items-center w-full py-2 font-color-dark hover:bg-gray-200 hover:rounded-lg  transition duration-200 ease-in-out">
                    <img src="/ACCUEIL.png" alt="accueil" class="w-6 "/>
                    <p class="text-xs mt-1">Accueil</p>
                </a>
                <a hx-get="/profile" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex flex-col justify-center items-center w-full py-2 font-color-dark hover:bg-gray-200 hover:rounded-lg  transition duration-200 ease-in-out">
                    <img src="/PROFIL.png" alt="profil" class="w-6"/>
                    <p class="text-xs mt-1">Profile</p>
                </a>
                <a hx-get="/parameters" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex flex-col justify-center items-center w-full py-2 font-color-dark hover:bg-gray-200 hover:rounded-lg  transition duration-200 ease-in-out">
                    <img src="/REGLAGES.png" alt="réglages" class="w-6"/>
                    <p class="text-xs mt-1">Réglages</p>
                </a>
            </div>
        </div>
    );
}
