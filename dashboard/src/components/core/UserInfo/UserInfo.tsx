import { FC } from 'react';
import { Avatar, Pane, Popover, Position, Button } from 'evergreen-ui';

import { UserEmail, UserInfoWrapper, UserMainInfo } from './styles';

export interface UserInfoProps {
  user?: {
    name: string;
    surname: string;
    email: string;
    createdAt?: string;
  };
  onLogout?: () => void;
}

export const UserInfo: FC<UserInfoProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div>
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={() => (
            <Pane
              padding={20}
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <Avatar name={`${user.name} ${user.surname}`} color='blue' size={64} marginBottom={16} />
              <UserEmail>{user.email}</UserEmail>
              {user.createdAt && <UserEmail>Registered{user.createdAt}</UserEmail>}
              {onLogout && <Button onClick={onLogout}>Logout</Button>}
            </Pane>
          )}
        >
          <UserInfoWrapper>
            <Avatar name={`${user.name} ${user.surname}`} color='blue' size={32} />
            <UserMainInfo>
              {user.name}&nbsp;{user.surname}
            </UserMainInfo>
          </UserInfoWrapper>
        </Popover>
    </div>
  );
};
