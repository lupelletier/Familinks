export default function Badge({name}: {name: string}): any {
    return (
        <div class="bg-green rounded-full text-center w-fit px-2 text-xs font-normal">
            <p class="font-color-dark">{name}</p>
        </div>
    )
}