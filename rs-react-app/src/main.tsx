import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './colors.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ErrorPage from './components/errorPage/errorPage';
// import type Popout from './components/popout/popout';
// import PokemonDetails from './components/PokemonDetails/pokemonDetails';
import Popout from './components/popout/popout';
// import Layout from './components/layout/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/pokemon/:pokemonId',
        element: <Popout />,
      },
    ],
  },
  /* {
    path: '/pokemon/:pokemonId',
    element: <App />,
    loader: async ({ params }) => {
      return { pokemonId: params.pokemonId };
    },
  }, */
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
