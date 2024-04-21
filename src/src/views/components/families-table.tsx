import HxButton from '../components/hx-buttton';
const TableRow = (props: { family }) => {
  return (
    <tr>
      <td>{props.family.id}</td>
      <td>{props.family.name}</td>
      <td>{props.family.button}</td>
    </tr>
  );
}

export default function FamilesTable(props: { families }) {
  return (
    <table class="min-w-full divide-y divide-gray-200">
      <tr class="bg-gray-50">
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Name</th>
      </tr>
      {props.families.map(family => {
        family.button = <HxButton method="get" url={`/api/v1/families/${family.name}/users`} target='#users' display={`${family.name} members`} />;
        return (
          < TableRow family={family} />
        );
      })}
    </table>
  );
}
