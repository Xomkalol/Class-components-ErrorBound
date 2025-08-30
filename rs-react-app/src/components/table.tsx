import type { EmissionsData } from '../App';

interface TableProps {
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
          const latestEntry = countryData.data[countryData.data.length - 1]; // последняя запись

          return (
            <tr key={countryName}>
              <th scope="row">X</th>
              <td>{countryName}</td>
              <td>{latestEntry?.population?.toLocaleString() || 'N/A'}</td>
              <td>{countryData.iso_code}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
