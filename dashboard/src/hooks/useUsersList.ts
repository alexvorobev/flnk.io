import { useQuery } from '@apollo/client';

import { User } from 'schema/types';
import { getUsersQuery } from 'queries';

interface UsersListQuery {
  getUsers: User[];
}

export const useUsersList = (): User[] => {
  const { data } = useQuery<UsersListQuery>(getUsersQuery);
  const users = data?.getUsers?.map((user) => ({
    id: `${user.id}`,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  }));

  return users ?? [];
};
