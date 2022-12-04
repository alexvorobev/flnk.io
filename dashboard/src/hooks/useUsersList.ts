import { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Query } from 'schema/types';
import { getUsersQuery } from 'queries';
import { updateUserMutation } from 'mutations/updateUserMutation';


export const useUsersList = () => {
  const { data, fetchMore } = useQuery<Query>(getUsersQuery);
  const [updateUser] = useMutation(updateUserMutation);
  const totalUsers = data?.getUsers?.total || 0;
  const users = data?.getUsers?.items?.map((user) => ({
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

  const handleUserRoleChange = useCallback(
    (id: number, role: string) => {
      updateUser({
        variables: {
          updateUserInput: {
            id,
            role,
          },
        },
      });
    },
    [updateUser],
  );

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        cursor: users?.[users.length - 1].id,
      },
    });
  }, [fetchMore, users]);

  return {
    users: users ?? [],
    handleUserBlock,
    handleUserRoleChange,
    handleFetchMore: totalUsers > (users?.length ?? 0) ? handleFetchMore : undefined,
  };
};
