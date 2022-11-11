import { FC, useState } from 'react';
import { BiUser } from 'react-icons/bi';

import { Button } from '../Button';

import { UserEmail, UserInfoWrapper, UserMainInfo, UserPhoto, UserPopup } from './styles';

export interface UserInfoProps {
  user?: {
    name: string;
    surname: string;
    email: string;
    createdAt?: string;
  };
  onLogout?: () => void;
}

const UserInfo: FC<UserInfoProps> = ({ user, onLogout }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  if (!user) return null;

  return (
    <UserInfoWrapper onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
      <UserPhoto>
        <BiUser size={16} />
      </UserPhoto>
      <UserMainInfo>
        {user.name}&nbsp;{user.surname}
      </UserMainInfo>
      {showPopup && (
        <UserPopup>
          <hr />
          <UserEmail>{user.email}</UserEmail>
          {user.createdAt && <UserEmail>Registered{user.createdAt}</UserEmail>}
          {onLogout && <Button onClick={onLogout}>Logout</Button>}
        </UserPopup>
      )}
    </UserInfoWrapper>
  );
};

export default UserInfo;
