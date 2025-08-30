import type { AnnualData, CountryData } from '../../App';

interface TablelistProps {
  countryName: string;
  latestEntry: AnnualData;
  countryData: CountryData;
}

export default function TableList({
  countryName,
  latestEntry,
  countryData,
}: TablelistProps) {
  return (
    <tr key={countryName}>
      <th scope="row">
        <button>X</button>
      </th>
      <td>{countryName}</td>
      <td>{latestEntry?.population?.toLocaleString() || 'N/A'}</td>
      <td>{countryData.iso_code}</td>
    </tr>
  );
}
