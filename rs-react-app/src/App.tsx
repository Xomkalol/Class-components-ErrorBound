import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();
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
      {' '}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
