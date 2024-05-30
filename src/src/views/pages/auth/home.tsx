import LoadingIndicator from '../../components/loading-indicator';
import HxButton from '../../components/hx-buttton';
import SleepButton from "../../components/sleep-button";
import Badge from "~/views/components/badge";
import logo from "../../../../public/LOGOS-VIOLET.png";
export default function Home(props: {user: any }): any {
    console.log('user', props.user);

    return (
        <div class="flex flex-col overflow-y-auto md:h-screen">
            <img alt="logo" src='/LOGOS-VIOLET.png'/>
            <Badge name="Home" />
            <div style={
{
                    backgroundImage: "url('../../../../public/LOGOS-VIOLET.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh"
                }
            }>

            </div>
            <LoadingIndicator />
            <main class="flex flex-1 flex-col items-center justify-start p-2">
                <div class="my-7 text-center sm:my-16">
                    <h1 class="text-3xl uppercase md:text-3xl lg:text-4xl">Welcome, {}</h1>
                    <h2 class="mt-6 text-xs md:text-sm lg:text-lg">
                        This is an experimental page.
                    </h2>
                </div>
                <div >
                    <SleepButton value="2" />
                    <HxButton method={"get"} url={"/api/families"} target='#families' display="Get families green" bgColor="bg-green" fontColor="font-color-dark" />
                    <HxButton method="get" url="/api/families" target='#families' display="Get Families" bgColor="bg-purple" />
                </div>
                <div id="users"></div>
                <div id="families"></div>
                <div id="alerts"></div>
            </main>
        </div>
    );
}
