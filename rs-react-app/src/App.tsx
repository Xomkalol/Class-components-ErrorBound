import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/table';

export interface EmissionsData {
  [countryName: string]: CountryData;
}

export interface CountryData {
  iso_code: string;
  data: AnnualData[];
}

export interface AnnualData {
  [key: string]: number;
}

function App() {
  const [data, setData] = useState<EmissionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {'error'}</div>;
  }

  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default App;
