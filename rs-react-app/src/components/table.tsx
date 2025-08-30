import type { EmissionsData } from '../App';
import TableList from './tableList/tableList';

export interface TableProps {
  data: EmissionsData | null;
}

export default function Table({ data }: TableProps) {
  if (!data) {
    return <div>No data!</div>;
  }

  const countries = Object.keys(data);
  return (
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">country</th>
          <th scope="col">Population (latest)</th>
          <th scope="col">ISO code</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((countryName) => {
          const countryData = data[countryName];
          const latestEntry = countryData.data[countryData.data.length - 1];

          return (
            <TableList
              countryName={countryName}
              latestEntry={latestEntry}
              countryData={countryData}
            ></TableList>
          );
        })}
      </tbody>
    </table>
  );
}
