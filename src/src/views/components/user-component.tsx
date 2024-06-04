export default async function UserComponent(props: { user: any, currentUserId: number}) {
    const isCurrentUser = props.currentUserId === props.user.userId;
    console.log(props.currentUserId);

    return (
        <div class={`flex items-center mx-5 my-2`}>
            <img src="/VIOLETTE_bonjour.png" alt="user icon" class={`w-10 bg-green rounded-full ${isCurrentUser ? 'bg-green' : 'bg-light'}`}/>
            <div class="mx-3 flex flex-col">
                <div>{props.user.firstname} {props.user.lastname}</div>
                <div class="text-gray-500">@{props.user.username}</div>
            </div>
        </div>
    );
}