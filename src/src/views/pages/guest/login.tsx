import LoginForm from "~/views/components/authentication/login-form";
import {useState} from "react";
import HxButton from "~/views/components/hx-buttton";
import LoadingIndicator from "~/views/components/loading-indicator";

export default function Login(): any {
    return (
        <div class="bg-light flex items-center justify-center h-screen">
            <LoadingIndicator />

            <div class=" rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/3">
                <h2 class="text-2xl font-bold mb-4">Login</h2>
                <form id="login-form" class="space-y-4" action="/auth/login" method="POST">
                    <div>
                        <label for="username" class="block text-gray-700 font-normal mb-2">Nom d'utilisateur</label>
                        <input id="username" name="username" type="text" placeholder="Username" required
                               class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700 font-normal mb-2">Mot de passe</label>
                        <input id="password" name="password" type="password" placeholder="Password" required
                               class="appearance-none border rounded-md border-solid-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <HxButton method="post" url="/auth/login" target='#login' display="Je me connecte" bgColor="bg-purple"/>
                    <div id="login"></div>
                </form>
            </div>

        </div>
    )
}