export default function Desktop(){
    return (
        <div id="desktop" class="w-full text-lg font-color-dark flex flex-col justify-center items-center text-center mt-20">
            <div class="flex justify-center align-middle items-center text-center">
                <img src="/VIOLETTE_pasHappy1.png" alt="logo violette" class="w-1/4"/>
            </div>
            <h1 class="text-3xl font-bold font-color-dark mb-4">Oups !</h1>
            <p class="text-lg text-gray-700 mb-6">Notre application n'est actuellement pas disponible sur
                ordinateur.</p>
            <p class="text-sm text-gray-700">Veuillez essayer d'y accéder depuis votre appareil mobile.</p>
            <p class="text-sm text-gray-500 mt-2">Nous espérons vous y voir !</p>
            <div class="flex justify-center align-middle items-center text-center pb-20">
                <img src="/app_qr_code.jpeg" alt="app qr code" class="w-2/4"/>
            </div>
        </div>
    )
}