import Header from "~/views/components/header/header";

export default function MainLayout(props: { children: any }): any {
  return (
    <html>
    <head>
        <title>Familinks</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>

        <link rel="icon" href="/violette.svg"/>
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

    <body class="bg-white font-color-dark">
        <div id="main">
          {props.children}
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
