export default function HxBackLink(props: { method: string, url: string, target: string, swap: string}): any{
    return (
        <a
            {...{['hx-' + props.method]: `${props.url}`}}
            hx-target={props.target}
            hx-indicator="#loading-indicator"
            hx-swap={props.swap}
            type="submit"
            class={'w-full mb-10 py-2 font-color-dark hover-green underline'}
        >
            <p> &#60; Retour</p>
        </a>
    );
}