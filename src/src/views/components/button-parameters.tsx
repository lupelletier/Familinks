export default function ParametersButton(props:{icon: any, display: any, url: any, method: string, target: string, swap: string, pushurl?:boolean  }):any{
    console.log(props.pushurl);
    return (
        <button
            {...{ ['hx-' + props.method]: `${props.url}` }}
            hx-target={props.target}
            hx-indicator="#loading-indicator"
            hx-swap={props.swap}
            hx-push-url={props.pushurl}
            type="submit"
            class="rounded-md mx-2 bg-light flex justify-between items-center p-3 w-full">
            <div class="flex items-center">
                {/*<i class={props.icon}></i>*/}
                <p class="text-sm ml-1">{props.display}</p>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    )
}