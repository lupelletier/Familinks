import Badge from "~/views/components/badge";
import HxBackLink from "~/views/components/hx-back-link";

export default function ConfidentialityPolicies(){
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2 flex flex-col items-start">
                        <HxBackLink method="get" url="/parameters" target="#home-auth" swap="innerHTML"
                                    style="left-0 underline pb-2"/>
                        <Badge name="Paramètres"/>
                    </div>
                    <img src='/VIOLETTE_happy_1.png' alt="violette happy" class="w-16"/>
                </div>
                <div class="flex flex-col items-start justify-between bg-lila rounded-2xl m-2">

                    <div class="flex flex-col items-center justify-center bg-light m-3 space-y-4">
                        <h2 class="text-sm font-semibold p-2">Politique de Confidentialité</h2>
                        <p class="mx-4">
                            Date d'entrée en vigueur : 27 mai 2024

                            Chez Familinks, nous accordons une grande importance à la protection de vos données personnelles. Cette Politique de Confidentialité explique quelles informations nous collectons, comment nous les utilisons et les partageons, et les mesures que nous prenons pour garantir leur sécurité.

                            Collecte des Informations

                            Informations que vous nous fournissez :
                            - Inscription et Profil : Lors de la création d'un compte sur Familinks, nous collectons des informations telles que votre nom, adresse e-mail, et toute autre information que vous choisissez de fournir.
                            - Contenu Utilisateur : Nous collectons les réponses aux questions quotidiennes et tout autre contenu que vous partagez sur l'application.

                            Informations collectées automatiquement :
                            - Données de journal : Nous collectons des informations sur votre utilisation de l'application, telles que votre adresse IP, le type de navigateur, les pages visitées, et les interactions avec l'application.
                            - Données de l'appareil : Nous collectons des informations sur l'appareil que vous utilisez pour accéder à Familinks, y compris le modèle de l'appareil, le système d'exploitation, et les identifiants uniques de l'appareil.

                            Utilisation des Informations

                            Nous utilisons les informations collectées pour :
                            - Fournir et améliorer l'application : Nous utilisons vos informations pour exploiter, maintenir, et améliorer Familinks.
                            - Personnaliser l'expérience utilisateur : Nous utilisons vos informations pour personnaliser votre expérience, comme afficher des questions pertinentes.
                            - Communiquer avec vous : Nous pouvons utiliser vos informations pour vous envoyer des notifications, mises à jour, et autres communications relatives à l'application.
                            - Analyser l'utilisation : Nous utilisons les données pour comprendre comment notre application est utilisée et pour améliorer nos services.

                            Partage des Informations

                            Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
                            - Avec votre consentement : Nous partageons vos informations avec des tiers lorsque vous nous donnez votre consentement pour le faire.
                            - Fournisseurs de services : Nous pouvons partager vos informations avec des fournisseurs de services qui nous aident à exploiter et améliorer l'application. Ces fournisseurs sont tenus de protéger vos informations et de les utiliser uniquement aux fins pour lesquelles elles ont été partagées.
                            - Obligations légales : Nous pouvons partager vos informations pour nous conformer à une obligation légale ou pour répondre à une demande gouvernementale.

                            Sécurité des Informations

                            Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations contre l'accès, l'utilisation, ou la divulgation non autorisés. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir la sécurité absolue de vos informations.

                            Conservation des Informations

                            Nous conservons vos informations aussi longtemps que nécessaire pour fournir l'application et pour remplir les objectifs décrits dans cette Politique de Confidentialité. Nous pouvons également conserver certaines informations pour nous conformer à des obligations légales, résoudre des litiges, et faire respecter nos accords.

                            Vos Droits

                            Vous avez le droit de :
                            - Accéder à vos informations : Vous pouvez demander une copie des informations personnelles que nous détenons à votre sujet.
                            - Modifier vos informations : Vous pouvez corriger ou mettre à jour vos informations personnelles.
                            - Supprimer vos informations : Vous pouvez demander la suppression de vos informations personnelles, sous réserve de certaines exceptions.
                            - Restreindre le traitement : Vous pouvez demander que nous limitions le traitement de vos informations personnelles dans certaines circonstances.

                            Pour exercer ces droits, veuillez nous contacter à contact@familinks.fr

                            Modifications de la Politique de Confidentialité

                            Nous pouvons modifier cette Politique de Confidentialité de temps à autre. Toute modification sera publiée sur cette page avec la date de la dernière mise à jour. Nous vous encourageons à consulter régulièrement cette Politique de Confidentialité pour rester informé de la manière dont nous protégeons vos informations.

                            Contact

                            Si vous avez des questions ou des préoccupations concernant cette Politique de Confidentialité, veuillez nous contacter à contact@familinks.fr .

                            En utilisant Familinks, vous reconnaissez avoir lu et compris cette Politique de Confidentialité et acceptez la manière dont nous collectons, utilisons et partageons vos informations.

                            Familinks
                            26 rue de la villette, Lyon 69003
                            contact@familinks.fr
                            0606060606
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}