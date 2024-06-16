import HxButton from "~/views/components/hx-buttton";

export default function SignupForm(): any {
    return (
/*
        <form class="signup-form" hx-post="/auth/signup" hx-target="#home-guest" hx-swap="innerHTML" hx-push-url="true"
              hx-indicator="#loading-indicator">
*/
        <form id="signup-form" class="w-full" action="/auth/signup" method="POST">
            <div class="space-y-4">
                <div>
                    <label for="username" class="block text-gray-700 font-normal mb-2">Nom d'utilisateur</label>
                    <input id="username" name="username" type="text" placeholder="Username" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="email" class="block text-gray-700 font-normal mb-2">Email</label>
                    <input id="email" name="email" type="text" placeholder="Email" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="firstname" class="block text-gray-700 font-normal mb-2">Prénom</label>
                    <input id="firstname" name="firstname" type="text" placeholder="Firstname" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="lastname" class="block text-gray-700 font-normal mb-2">Nom</label>
                    <input id="lastname" name="lastname" type="text" placeholder="Lastname" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="password" class="block text-gray-700 font-normal mb-2">Mot de passe</label>
                    <input id="password" name="password" type="password" placeholder="Password" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="confirm-password" class="block text-gray-700 font-normal mb-2">Confirmation de mot de
                        passe</label>
                    <input id="confirm-password" name="confirm-password" type="password" placeholder="Password" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center">
                        <input type="checkbox" id="terms" name="terms" required class="mr-2 leading-tight"/>
                        <label for="terms" class="font-color-dark text-xs">J'accepte les <a href="/terms"
                                                                                            class="font-color-dark underline">termes
                            et conditions</a></label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="newsletter" name="newsletter" class="mr-2 "/>
                        <label for="newsletter" class="font-color-dark text-xs">Je souhaite recevoir la
                            newsletter</label>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <button type="submit"
                        class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Créer mon compte
                </button>
            </div>
        </form>
    );
}
