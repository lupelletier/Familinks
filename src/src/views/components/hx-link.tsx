export default function HxLink(props: { display: string, url: string }): any {
    return (
        <a hx-get={props.url} hx-push-url="true"
           class="flex justify-center items-center block w-full py-2 px-4 font-color-dark hover-green">
            {props.display}
        </a>
    );
}