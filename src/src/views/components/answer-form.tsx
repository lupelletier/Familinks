import LoadingIndicator from "~/views/components/loading-indicator";
import HxBackLink from "~/views/components/hx-back-link";
import LoginForm from "~/views/components/authentication/login-form";
import HxLink from "~/views/components/hx-link";

export default function AnswerForm(props: { user: any, question: any}){
    return (
        <form class="login-form py-4" hx-post="/api/answer-question" hx-target="#home-auth" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#loading-indicator">
            <p class="text-sm font-semibold px-2 py-2">{props.question.question}</p>

            <div class={'space-y-4'}>
                <div class="flex justify-center items-center">
                    <label for="response" class="block text-gray-700 font-normal mb-2"></label>
                    <input id="response" name="response" type="text" placeholder="Votre réponse" required
                           class="mx-4 px-2 appearance-none border rounded-md py-2 w-10/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
            </div>
            <div class="flex justify-center items-center mt-10">
                <button type="submit"
                        class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Répondre à la question
                </button>
            </div>
        </form>
    )
}