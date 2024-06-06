import Badge from "~/views/components/badge";
import HxBackLink from "~/views/components/hx-back-link";

export default function CGU(props:{guest: any}) {
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>

            <div class="px-3 w-full">
                {
                    !props.guest
                        ?
                        (
                            <div class="flex justify-between items-end">
                                <div class="pb-2 px-2 flex flex-col items-start">
                                    <HxBackLink method="get" url="/parameters" target="#home-auth" swap="innerHTML"
                                                style="left-0 underline pb-2"/>
                                    <Badge name="Paramètres"/>
                                </div>
                                <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                            </div>
                        )
                        : <div class="flex justify-between items-end">
                            <div class="pb-2 px-2 flex flex-col items-start">
                                <HxBackLink method="get" url="/auth/signup" target="#home-guest" swap="innerHTML"
                                            style="left-0 underline pb-2"/>
                            </div>
                            <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                        </div>
                }
                <div class="flex flex-col items-start justify-between bg-lila rounded-2xl m-2">
                    <div class="flex flex-col items-center justify-center bg-light m-3 space-y-4">
                        <h2 class="text-sm font-semibold p-2">Conditions générales d'utilisation</h2>
                        <p class="mx-4">
                            Date d'entrée en vigueur : 27 mai 2024

                            Merci d'utiliser Familinks. En utilisant notre application, vous acceptez les présentes
                            Conditions Générales d'Utilisation (ci-après « CGU »). Veuillez les lire attentivement.

                            Acceptation des CGU
                            En accédant ou en utilisant l'application Familinks, vous acceptez d'être lié par les
                            présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser
                            l'application.

                            Description du Service
                            Familinks est une application destinée à renforcer les liens familiaux en proposant chaque
                            jour une question à laquelle chaque membre de la famille doit répondre. Les réponses des
                            autres membres sont masquées jusqu'à ce que vous ayez répondu.

                            Inscription et Compte Utilisateur
                            - Inscription : Pour utiliser Familinks, vous devez créer un compte en fournissant des
                            informations exactes, complètes et à jour.
                            - Sécurité du compte : Vous êtes responsable de la confidentialité de vos identifiants de
                            connexion et de toutes les activités effectuées sous votre compte.

                            Utilisation de l'Application
                            - Accès et utilisation : Vous pouvez accéder à Familinks et l'utiliser conformément aux
                            présentes CGU et à toute loi applicable.
                            - Contenu Utilisateur : Vous êtes responsable du contenu que vous publiez sur Familinks.
                            Vous ne devez pas publier de contenu illégal, offensant, ou inapproprié.
                            - Interaction Familiale : Vous devez respecter les autres membres de votre famille et leur
                            vie privée lors de l'utilisation de l'application.

                            Confidentialité et Sécurité
                            - Données personnelles : Vos données personnelles sont collectées et traitées conformément à
                            notre Politique de Confidentialité.
                            - Sécurité : Nous mettons en œuvre des mesures raisonnables pour protéger vos informations
                            personnelles. Cependant, nous ne pouvons garantir une sécurité absolue.

                            Propriété Intellectuelle
                            - Droits de propriété : Familinks et son contenu sont protégés par des droits d'auteur et
                            d'autres droits de propriété intellectuelle. Vous ne pouvez pas copier, modifier, distribuer
                            ou utiliser notre contenu sans autorisation écrite préalable.

                            Restrictions d'Utilisation
                            Vous vous engagez à ne pas :
                            - Utiliser Familinks à des fins illégales ou non autorisées.
                            - Tenter d'accéder de manière non autorisée à nos systèmes ou réseaux.
                            - Interférer avec le bon fonctionnement de l'application.

                            Modifications des CGU
                            Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications seront
                            publiées sur l'application et entreront en vigueur dès leur publication. Il vous incombe de
                            consulter régulièrement les CGU.

                            Résiliation
                            Nous pouvons suspendre ou résilier votre accès à Familinks si vous ne respectez pas ces CGU
                            ou si nous estimons que votre utilisation de l'application est préjudiciable à d'autres
                            utilisateurs ou à nos opérations.

                            Limitation de Responsabilité
                            Familinks est fourni "tel quel" et "tel que disponible". Nous ne garantissons pas que
                            l'application sera exempte d'erreurs ou d'interruptions. Notre responsabilité est limitée
                            dans la mesure maximale permise par la loi.

                            Droit Applicable
                            Ces CGU sont régies par les lois du pays où est basée la société opérant Familinks. Tout
                            litige sera soumis à la juridiction exclusive des tribunaux compétents de ce pays.

                            Contact
                            Pour toute question concernant ces CGU, veuillez nous contacter à contact@familinks.fr .

                            En utilisant Familinks, vous reconnaissez avoir lu, compris et accepté ces Conditions
                            Générales d'Utilisation.

                            Familinks
                            26 rue de la vilette, Lyon 69003
                            contact@familinks.fr
                            0606060606
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}