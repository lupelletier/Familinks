import HxButton from '../components/hx-buttton';
import {Family} from "@prisma/client";
import HxButtton from "../components/hx-buttton";
const TableRow = (props: { family: Family}): JSX.Element => {
  return (
    <tr>
      <td>{props.family.familyId}</td>
      <td>{props.family.name}</td>
        <td>
            <HxButtton method="get" url={`/api/families/${props.family.familyId}/users`} target='#users' display={`${props.family.name} members`} bgColor={'bg-purple'} />
        </td>
    </tr>
  );
}

export default function FamilesTable(props: { families: Family[] }) {
  return (
    <table class="min-w-full divide-y divide-gray-200">
      <tr class="bg-gray-50">
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Name</th>
      </tr>
      {props.families.map(family => {
        return (
          < TableRow family={family} />
        );
      })}
    </table>
  );
}
