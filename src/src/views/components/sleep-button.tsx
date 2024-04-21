export default function SearchBar(props: { value: string }) {
  return (
    <button
      hx-post={"/api/v1/sleep/" + props.value}
      hx-indicator="#loading-indicator"
      hw-swap="afterbegin"
      type="submit"
      class="ml-2 rounded-lg border border-green-500 bg-green-500 p-2.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-white"
    >
      sleep {props.value}s
    </button>
  );
}
