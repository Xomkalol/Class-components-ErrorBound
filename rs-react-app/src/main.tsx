import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './colors.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ErrorPage from './components/errorPage/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/pokemon/:pokemonId',
    element: <App />,
    loader: async ({ params }) => {
      return { pokemonId: params.pokemonId };
    },
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
