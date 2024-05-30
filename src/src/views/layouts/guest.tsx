import MainNavigation from "~/views/components/navigation/main";

export default function GuestLayout(props: {children: any}): any {
    return (
        <html>
        <head>
            <title>Familinks</title>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>

            <link rel="icon" href="/violette.svg"/>
            <script src="https://kit.fontawesome.com/52a84c43db.js" crossorigin="anonymous"/>
            <meta
                name="description"
                content="Familinks App"
            />
            <meta
                name="keywords"
                content="Familinks, Family, Links, App"
            />


            <script src="https://unpkg.com/htmx.org@1.9.11"></script>

            <meta name="htmx-config" content='{"defaultSwapStyle":"outerHTML"}'/>

            <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet"/>
            <link href="/assets/css/index.min.css" rel="stylesheet"/>
        </head>

        <body class="bg-lila flex items-center justify-center h-screen">
            <h1 class="text-3xl font-bold text-red-600 mb-4">Oups !</h1>
            <p class="text-lg text-gray-700 mb-6">Notre application n'est actuellement pas disponible sur
                ordinateur.</p>
            <div class="mb-6">
                <img src="/LOGOS-BLACK.png" alt="Téléphone Mobile" class="mx-auto"/>
            </div>
            <p class="text-lg text-gray-700">Veuillez essayer d'y accéder depuis votre appareil mobile.</p>
            <p class="text-sm text-gray-500 mt-2">Nous espérons vous y voir !</p>
            <div class="mt-6">
                <a href="#"
                   class="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-500 transition duration-300 ease-in-out">En
                    savoir plus</a>
            </div>
        </body>

        <script
            defer
            src="https://kit.fontawesome.com/f559975e2f.js"
            crossorigin="anonymous"
        />
        <script src="/assets/js/custom-javascript.min.js" defer></script>
        </html>
    );
}