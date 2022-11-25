import { FC } from 'react';

import { NavigationMenu } from 'components/NavigationMenu';
import { UserInfo } from 'components/core/UserInfo';

import { AppName, HeaderContainer, HeaderWrapper, LogoContainer } from './styles';

interface Props {
  user?: {
    name: string;
    surname: string;
    email: string;
    role: string;
  };
  onLogout?: () => void;
}

export const Header: FC<Props> = ({ user, onLogout }) => {
  const { role } = user || {};

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <AppName>flnk.io</AppName>
          {role === 'ADMIN' && <NavigationMenu />}
        </LogoContainer>
        <UserInfo user={user} onLogout={onLogout} />
      </HeaderContainer>
    </HeaderWrapper>
  );
};
