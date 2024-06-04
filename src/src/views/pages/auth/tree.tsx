export default async function Tree(props: { family: any, user: any }) {

    const picture = await fetch("https://randomuser.me/api/?gender=female\n")
        .then((response) =>
            response.json()).then((data) => {
            return data.results[0].picture.large;
        });
    console.log(picture)
    return (
        <div class="flex items-center border-b border-gray-300 py-2">
            <img src={picture} alt="Profile" class="w-10 h-10 rounded-full mr-4"/>
            <div>
                <div>{props.user.firstname} {props.user.lastname}</div>
                <div class="text-gray-500">@{props.user.username}</div>
            </div>
        </div>
    )
}