export default function CreateFamilyForm() {
    return (
        <form class="create-family-form" hx-post="/auth/create-family" hx-push-url="true">
            <div class="space-y-4">
                <div>
                    <label for="familyName" class="block text-gray-700 font-normal mb-2">Nom de la famille</label>
                    <input id="familyName" name="familyName" type="text" placeholder="Nom de la famille" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <button type="submit"
                        class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Créer cette famille
                </button>
            </div>
            <div id="login"></div>
        </form>
    )
}