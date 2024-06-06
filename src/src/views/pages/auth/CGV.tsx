import Badge from "~/views/components/badge";
import HxBackLink from "~/views/components/hx-back-link";

export default function CGV(){
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
                        <h2 class="text-sm font-semibold p-2">Conditions générales de vente</h2>
                        <p class="mx-4">
                            Date d'entrée en vigueur : 27 mai 2024

                            Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les ventes de
                            services et d'abonnements proposés par l'application Familinks (ci-après « l'Application »).
                            Veuillez lire attentivement ces CGV avant de souscrire à nos services.

                            Acceptation des CGV

                            En souscrivant à un service ou un abonnement via l'Application Familinks, vous acceptez sans
                            réserve les présentes CGV. Si vous n'acceptez pas ces conditions, veuillez ne pas souscrire
                            à nos services.

                            Services Proposés

                            Familinks propose des services et des abonnements permettant d'accéder à des fonctionnalités
                            supplémentaires de l'Application pour renforcer les liens familiaux. Les descriptions
                            détaillées des services et abonnements disponibles sont accessibles via l'Application.

                            Inscription et Compte Utilisateur

                            Pour souscrire à nos services, vous devez créer un compte sur Familinks en fournissant des
                            informations exactes et à jour. Vous êtes responsable de la confidentialité de vos
                            identifiants de connexion et de toutes les activités effectuées sous votre compte.

                            Tarifs et Paiement

                            - Tarifs : Les tarifs des services et abonnements sont indiqués en euros, toutes taxes
                            comprises (TTC). Familinks se réserve le droit de modifier ses tarifs à tout moment. Les
                            modifications de tarifs ne s'appliqueront pas aux services ou abonnements déjà souscrits.
                            - Paiement : Le paiement des services et abonnements s'effectue via les moyens de paiement
                            proposés sur l'Application. Le paiement est exigible à la commande.

                            Abonnements

                            - Durée : Les abonnements peuvent être mensuels ou annuels. La durée de l'abonnement est
                            précisée lors de la souscription.
                            - Renouvellement : Les abonnements sont renouvelés automatiquement à la fin de chaque
                            période, sauf résiliation de votre part avant la date de renouvellement.
                            - Résiliation : Vous pouvez résilier votre abonnement à tout moment via les paramètres de
                            votre compte. La résiliation prendra effet à la fin de la période d'abonnement en cours.
                            Aucun remboursement ne sera accordé pour la période en cours.

                            Droit de Rétractation

                            Conformément à la législation en vigueur, vous disposez d'un délai de quatorze (14) jours à
                            compter de la souscription pour exercer votre droit de rétractation sans avoir à justifier
                            de motifs ni à payer de pénalités. Pour exercer ce droit, vous devez nous notifier votre
                            décision de rétractation par écrit. En cas de rétractation, nous vous rembourserons tous les
                            paiements reçus dans un délai de quatorze (14) jours à compter de la réception de votre
                            demande.

                            Utilisation des Services

                            En souscrivant à nos services, vous vous engagez à utiliser l'Application conformément aux
                            présentes CGV et à toute loi applicable. Vous ne devez pas utiliser les services de manière
                            abusive ou pour des fins illégales.

                            Propriété Intellectuelle

                            Familinks et son contenu sont protégés par des droits d'auteur et d'autres droits de
                            propriété intellectuelle. Vous ne pouvez pas copier, modifier, distribuer ou utiliser notre
                            contenu sans autorisation écrite préalable.

                            Limitation de Responsabilité

                            Familinks est fourni "tel quel" et "tel que disponible". Nous ne garantissons pas que
                            l'Application sera exempte d'erreurs ou d'interruptions. Notre responsabilité est limitée
                            dans la mesure maximale permise par la loi.

                            Modifications des CGV

                            Nous nous réservons le droit de modifier ces CGV à tout moment. Les modifications seront
                            publiées sur l'Application et entreront en vigueur dès leur publication. Il vous incombe de
                            consulter régulièrement les CGV.

                            Droit Applicable

                            Ces CGV sont régies par les lois du pays où est basée la société opérant Familinks. Tout
                            litige sera soumis à la juridiction exclusive des tribunaux compétents de ce pays.

                            Contact

                            Pour toute question concernant ces CGV, veuillez nous contacter à contact@familinks.fr .

                            En souscrivant à nos services, vous reconnaissez avoir lu, compris et accepté ces Conditions
                            Générales de Vente.

                            Familinks
                            26 rue de la villette
                            contact@familinks.fr
                            0606060606
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}