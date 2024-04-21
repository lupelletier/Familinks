export default function AlertMessage(props: { message: string }) {
  return <div id="alerts" class="mt-8 text-center" hx-swap-oob="true">{props.message}</div>;
}
