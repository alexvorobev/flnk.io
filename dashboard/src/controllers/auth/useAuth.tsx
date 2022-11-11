import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PUBLIC_ROUTES, ROUTES } from 'routes';

interface AuthContextType {
  isAuthorized: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const noop = () => {};

const AuthContext = createContext<AuthContextType>({
  isAuthorized: false,
  handleLogin: noop,
  handleLogout: noop,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isPublicRoute = useMemo(() => {
    return Object.values(PUBLIC_ROUTES).includes(location.pathname);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!!token && token.length > 0) {
      setIsAuthorized(true);
    } else if (!isPublicRoute) {
      navigate(ROUTES.AUTH);
    }
  }, [navigate, isPublicRoute]);

  const handleLogin = useCallback(
    (token: string) => {
      localStorage.setItem('token', token);
      setIsAuthorized(true);
      navigate(ROUTES.HOME);
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    localStorage.setItem('token', '');
    setIsAuthorized(false);
  }, []);

  return <AuthContext.Provider value={{ isAuthorized, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
