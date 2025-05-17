import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
