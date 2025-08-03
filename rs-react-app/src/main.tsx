import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './colors.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ErrorPage from './components/errorPage/errorPage';
import Popout from './components/popout/popout';
import About from './components/About/about';
import { ThemeProvider } from './util/contextProvider';

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
  {
    path: '/about',
    element: <About></About>,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
