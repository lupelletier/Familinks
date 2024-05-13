import LoadingIndicator from '../components/loading-indicator';
import MyButton from '../components/sleep-button';
import HxButton from '../components/hx-buttton.tsx';

export default function Experimental() {
  return (
    <div class="flex flex-col overflow-y-auto md:h-screen">
      <LoadingIndicator />
      <main class="flex flex-1 flex-col items-center justify-start p-2">
        <div class="my-7 text-center sm:my-16">
          <h1 class="text-3xl uppercase md:text-3xl lg:text-4xl">Experimental</h1>
          <h2 class="mt-6 text-xs md:text-sm lg:text-lg">
            This is an experimental page.
          </h2>
        </div>
        <div >
          <MyButton value="2" />
          <HxButton method="get" url="/api/families" target='#families' display="Get Families" />
        </div>
        <div id="users"></div>
        <div id="families"></div>
        <div id="alerts"></div>
      </main>
    </div>
  );
}
