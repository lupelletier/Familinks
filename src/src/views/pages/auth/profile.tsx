import Badge from "~/views/components/badge";
import { getFamilyByFamilyId } from "~/services/daily";
import ShareLink from "~/views/components/share-link";

export default async function Profile(props: { user: any }) {
    const family = await getFamilyByFamilyId(props.user.familyId);

    // Define shareOnWhatsApp function
    function shareOnWhatsApp() {
        if (typeof window !== "undefined") {
            var websiteUrl = encodeURIComponent(window.location.href);
            var customMessage = encodeURIComponent("Check out this website:\n\n```Your code snippet here```");
            var whatsappUrl = "https://wa.me/?text=" + customMessage + "%0A" + websiteUrl;
            window.open(whatsappUrl);
        }
    }

    return (
        <div class="pb-10">
            <div class="w-full flex flex-col items-center pb-7">
                <div class="flex items-center justify-center mt-7">
                    <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
                </div>
                <div class="px-3 w-full">
                    <div class="flex justify-between items-end">
                        <div class="pb-2 px-2">
                            <Badge name="Profile"/>
                        </div>
                        <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                    </div>
                </div>

                <div class="bg-lila rounded-2xl p-6 mx-0.5 mt-5 flex flex-col items-center">
                    <img src="/VIOLETTE_happy_2.png" alt="user icon" class="w-20 rounded-full bg-green"/>
                    <form id="profile-update-form" hx-post="/api/profile/update" hx-target="#home-auth"
                          hx-swap="innerHTML"
                          hx-push-url="true">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={props.user.email}
                                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onkeyup="this.setCustomValidity('') // reset the validation on keyup"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                            <input
                                type="text"
                                name="username"
                                value={props.user.username}
                                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div class="flex justify-center mt-6">
                            <button type="submit"
                                    class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                                Enregistrer les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="px-4 font-bold font-color-dark mt-5">
                Famille {family?.name}
            </div>
            <div class="px-4 text-xs">
                Code de la famille : {family?.code}
            </div>
            {family?.code ? (
                <ShareLink display="Partager sur WhatsApp" familyCode={family?.code} href="https://wa.me/?text=" />
                ):
                <div></div>
            }

        </div>
    );
}
