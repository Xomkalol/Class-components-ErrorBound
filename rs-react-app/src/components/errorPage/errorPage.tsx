import { Link } from 'react-router';

export default function errorPage() {
  return (
    <>
      <h1>Error Page!!</h1>
      <Link to="/">Back to home</Link>
    </>
  );
}
