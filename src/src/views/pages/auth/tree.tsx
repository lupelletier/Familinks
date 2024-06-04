import {getUsersByFamilyId} from "~/utils/db";
import UserComponent from "~/views/components/user-component";
import Badge from "~/views/components/badge";
import {getFamilyByFamilyId} from "~/services/daily";

export default async function Tree(props: { familyUsers: any, user: any, familyName: any}) {
    return (
        <div class="w-full flex flex-col items-center pb-7">
            <div class="flex items-center justify-center mt-7">
                <img src="/LOGOS-VIOLET.png" alt="logo purple" class="w-1/2"/>
            </div>
            <div class="px-3 w-full">
                <div class="flex justify-between items-end">
                    <div class="pb-2 px-2">
                        <Badge name="Question du jour"/>
                    </div>
                    <img src='/violette_happy_1.png' alt="violette happy" class="w-16"/>
                </div>

                <div class="flex justify-between items-center px-2 font-bold font-color-dark">
                    Famille {props.familyName}
                </div>
                <div class="flex flex-col items-start justify-between bg-lila rounded-2xl m-2 p-3">
                    {props.familyUsers.map((user: any) => {
                        return (
                            <UserComponent user={user} currentUserId={props.user.userId}/>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}