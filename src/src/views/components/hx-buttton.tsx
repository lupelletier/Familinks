export default function SearchBar(props: { method: string, url: string, target: string, display: string }) {

  return (
    <button
      {...{ ['hx-' + props.method]: `${props.url}` }}
      hx-target={props.target}
      hx-indicator="#loading-indicator"
      hx-swap="innerHTML"
      type="submit"
      class="ml-2 rounded-lg border border-green-500 bg-green-500 p-2.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-white"
    >
      {props.display}
    </button >
  );
}
