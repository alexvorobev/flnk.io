import { useMutation, useQuery } from '@apollo/client';

import { User } from 'schema/types';
import { getUsersQuery } from 'queries';
import { useCallback } from 'react';
import { updateUserMutation } from 'mutations/updateUserMutation';

interface UsersListQuery {
  getUsers: User[];
}

export const useUsersList = () => {
  const { data } = useQuery<UsersListQuery>(getUsersQuery);
  const [updateUser] = useMutation(updateUserMutation);
  const users = data?.getUsers?.map((user) => ({
    id: `${user.id}`,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
  }));

  const handleUserBlock = useCallback(
    (id: number, blocked: boolean) => {
      updateUser({
        variables: {
          updateUserInput: {
            id,
            isBlocked: blocked,
          },
        },
      });
    },
    [updateUser],
  );

  return {
    users: users ?? [],
    handleUserBlock,
  };
};
