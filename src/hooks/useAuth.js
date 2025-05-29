import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { accessToken, isLoggedIn } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken) && isLoggedIn;
  return { isAuthenticated };
};