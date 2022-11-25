import { useQuery } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { meQuery } from 'queries/meQuery';
import { PUBLIC_ROUTES, ROUTES } from 'routes';

interface AuthContextType {
  me?: {
    name: string;
    surname: string;
    email: string;
    role: string;
  };
  isAuthorized: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const noop = () => {};

const AuthContext = createContext<AuthContextType>({
  me: undefined,
  isAuthorized: false,
  handleLogin: noop,
  handleLogout: noop,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const location = useLocation();
  const { data } = useQuery(meQuery);
  const me = data?.me;

  const isPublicRoute = useMemo(() => {
    return Object.values(PUBLIC_ROUTES).includes(location.pathname);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!!token && token.length > 0) {
      setIsAuthorized(true);
    } else if (!isPublicRoute) {
      window.location.replace(ROUTES.AUTH);
    }
  }, [isPublicRoute]);

  const handleLogin = useCallback((token: string) => {
    localStorage.setItem('token', token);
    setIsAuthorized(true);
    window.location.replace(ROUTES.HOME);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.setItem('token', '');
    setIsAuthorized(false);
    window.location.replace(ROUTES.AUTH);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, handleLogin, handleLogout, me }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
