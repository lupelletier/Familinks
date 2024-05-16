export default function HxButtton(props: { method: string, url: string, target: string, display: string, bgColor: string, fontColor?: string}): any{
  return (
    <button
      {...{ ['hx-' + props.method]: `${props.url}` }}
      hx-target={props.target}
      hx-indicator="#loading-indicator"
      hx-swap="innerHTML"
      type="submit"
      class={ `${props.bgColor} ${props.fontColor ? props.fontColor : 'font-color-light'} ml-2 rounded-full border p-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white` }
    >
      {props.display}
    </button >
  );
}
