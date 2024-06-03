import HxLink from "~/views/components/hx-link";

export default function JoinFamilyForm() {
    return (
        <form class="join-family-form" hx-post="/auth/join-family" hx-target="#home-guest" hx-swap="innerHTML" hx-push-url="true">
            <div class="space-y-4">
                <div>
                    <label for="familyCode" class="block text-gray-700 font-normal mb-2">Code famille</label>
                    <input id="familyCode" name="familyCode" type="text" placeholder="Code famille" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <button type="submit"
                        class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Rejoindre cette famille
                </button>
            </div>
            <div id="login"></div>
        </form>
    )
}