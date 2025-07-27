import { Outlet } from 'react-router';
import './layout.css';

export default function Layout() {
  return (
    <div className="app-layout">
      <Outlet />
      <div className="popout-container">
        <Outlet />
      </div>
    </div>
  );
}
