import MainNavigation from "../components/navigation/main";
import LoadingIndicator from "~/views/components/loading-indicator";

export default function MainLayout(props: { children: any }): any {
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

      <body class="bg-light font-color-dark">
          <div id="desktop"
               class="w-full text-lg font-color-dark flex display-center justify-center items-center text-center mt-20">
              <div class="flex justify-center align-middle items-center text-center ">
                  <img src="/VIOLETTE_pasHappy1.png" alt="logo violette" class="w-1/3 "/>
              </div>
              <h1 class="text-3xl font-bold font-color-dark mb-4">Oups !</h1>
              <p class="text-lg text-gray-700 mb-6">Notre application n'est actuellement pas disponible sur
                  ordinateur.</p>
              <p class="text-sm text-gray-700">Veuillez essayer d'y accéder depuis votre appareil mobile.</p>
              <p class="text-sm text-gray-500 mt-2">Nous espérons vous y voir !</p>
              <div class="flex justify-center align-middle items-center text-center pb-20">
                  <img src="/app_qr_code.jpeg" alt="app qr code" class="w-1/4"/>
              </div>
          </div>
      <div id="main">
          <LoadingIndicator/>
          <div id="home-auth" class="w-full pb-16">
              {props.children}
          </div>
              <MainNavigation/>
      </div>


      </body>

      <script
          defer
          src="https://kit.fontawesome.com/f559975e2f.js"
          crossorigin="anonymous"
      />
      <script src="/assets/js/custom-javascript.min.js"></script>
      </html>
  );
}
