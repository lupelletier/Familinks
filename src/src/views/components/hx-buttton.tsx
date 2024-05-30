export default function HxButton(props: { method: string, url: string, target: string, swap: string, display: string, bgColor: string, fontColor?: string}): any{
  return (
    <button
      {...{ ['hx-' + props.method]: `${props.url}` }}
      hx-target={props.target}
      hx-indicator="#loading-indicator"
      hx-swap={props.swap}
      type="submit"
      class={ `${props.bgColor} ${props.fontColor ? props.fontColor : 'font-color-light'} text-center ml-2 rounded-full border p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white` }
    >
      {props.display}
    </button >
  );
}
