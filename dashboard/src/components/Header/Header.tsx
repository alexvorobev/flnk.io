import { FC } from 'react';

import UserInfo from 'components/core/UserInfo/UserInfo';
import { NavigationTabs } from 'components/NavigationTabs';

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
          <NavigationTabs />
        </LogoContainer>
        <UserInfo user={user} onLogout={onLogout} />
      </HeaderContainer>
    </HeaderWrapper>
  );
};
