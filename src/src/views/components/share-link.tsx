export default function ShareLink(props: { familyCode: any, display: string, href: string }) {
    console.log(props.familyCode)

    return (
        <a href={props.href} class="border border-gray-300 rounded-full p-2 mx-4 my-4 flex items-center justify-center">
            <img src="/whattsap.png" alt="WhatsApp icon" class="w-5 mr-1" />
            <p class="text-xs font-semibold">{props.display}</p>
        </a>
    );
}
