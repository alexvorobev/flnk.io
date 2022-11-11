import { FC } from 'react';

import UserInfo from 'components/core/UserInfo/UserInfo';

import { AppName, HeaderContainer, HeaderWrapper } from './styles';

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
        <AppName>flnk.io</AppName>
        <UserInfo user={user} onLogout={onLogout} />
      </HeaderContainer>
    </HeaderWrapper>
  );
};
