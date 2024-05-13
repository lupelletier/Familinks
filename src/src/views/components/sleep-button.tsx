export default function SleepButton(props: { value: string }) {
  return (
    <button
      hx-post={"/api/sleep/" + props.value}
      hx-indicator="#loading-indicator"
      hw-swap="afterbegin"
      type="submit"
      class="ml-2 rounded-full bg-purple border p-2.5 text-sm font-medium font-color-light focus:outline-none focus:ring-1 focus:ring-white"
    >
      sleep {props.value}s
    </button>
  );
}
