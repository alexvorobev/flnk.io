import { FC } from 'react';

import { NavigationMenu } from 'components/NavigationMenu';
import { UserInfo } from 'components/core/UserInfo';

import { AppName, HeaderContainer, HeaderWrapper, LogoContainer } from './styles';

interface Props {
  user?: {
    name: string;
    surname: string;
    email: string;
  };
  onLogout?: () => void;
}

export const Header: FC<Props> = ({ user, onLogout }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <AppName>flnk.io</AppName>
          <NavigationMenu />
        </LogoContainer>
        <UserInfo user={user} onLogout={onLogout} />
      </HeaderContainer>
    </HeaderWrapper>
  );
};
