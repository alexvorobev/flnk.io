import React from 'react';

import { Container } from 'components/core';
import { Header } from 'components/Header';
import { useAuth } from 'controllers/auth/useAuth';

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { me, handleLogout } = useAuth();

  return (
    <>
      <Header user={me} onLogout={handleLogout} />
      <Container>{children}</Container>
    </>
  );
};
