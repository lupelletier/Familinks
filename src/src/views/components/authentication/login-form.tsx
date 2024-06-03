import HxButton from "~/views/components/hx-buttton";
import HxLink from "~/views/components/hx-link";

export default function LoginForm(): any{
    return (
        <form class="login-form" hx-post="/auth/login" hx-target="#home-guest" hx-swap="innerHTML" hx-push-url="true">
            <div class={'space-y-4'}>
                <div>
                    <label for="username" class="block text-gray-700 font-normal mb-2">Nom d'utilisateur</label>
                    <input id="username" name="username" type="text" placeholder="Username" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                    <label for="password" class="block text-gray-700 font-normal mb-2">Mot de passe</label>
                    <input id="password" name="password" type="password" placeholder="Password" required
                           class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <div class=" underline text-xs absolute right-1">
                        <HxLink url="/auth/forgot-password" display="Mot de passe oublié ?" />
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <button type="submit" class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Je me connecte</button>
            </div>
            <div id="login"></div>
        </form>
    );
}
