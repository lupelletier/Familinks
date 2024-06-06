export default function MainNavigation(): any {
    return (
        <div class="fixed bottom-0 left-0 w-full sm:w-56 bg-light text-white p-4 flex justify-between items-center rounded-t-xl custom-shadow">
            <div class="flex items-center w-full" hx-target="#home-auth">
                <a hx-get="/" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
                    <i class="fa-solid fa-house text-lg"></i>
                </a>
                <a hx-get="/tree" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
                    <i class="fa-solid fa-users-line text-lg"></i>
                </a>
                <a hx-get="/history" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
                    <i class="fa-solid fa-book text-lg"></i>
                </a>
                <a hx-get="/profile" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
                    <i class="fa-solid fa-user text-lg"></i>
                </a>
                <a hx-get="/parameters" hx-push-url="true" hx-swap="innerHTML" hx-indicator="#loading-indicator"
                   class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
                    <i class="fa-solid fa-user text-lg"></i>
                </a>
            </div>
        </div>
    );
}
