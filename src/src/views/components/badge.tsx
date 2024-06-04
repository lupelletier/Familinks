export default function Badge({name}: {name: string}): any {
    return (
        <div class="bg-green rounded-md text-center w-fit px-2 text-xs font-normal p-1">
            <p class="font-color-dark">{name}</p>
        </div>
    )
}