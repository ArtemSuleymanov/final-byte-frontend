import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';

export default function PrivateLayout() {
  return (
    <>
      <Header />
      <main>
        <Navigation />
        <Outlet />
      </main>
    </>
  );
}
