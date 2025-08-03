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
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
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
    element: (
      <ThemeProvider>
        <About></About>
      </ThemeProvider>
    ),
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
