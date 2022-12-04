import { MainLayout } from 'components/layouts';
import { UsersTable } from 'components/UsersTable';
import { useUsersList } from 'hooks';

export const UsersPage = () => {
  const { users, handleUserBlock, handleUserRoleChange, handleFetchMore } = useUsersList();

  return (
    <MainLayout>
      <UsersTable users={users} onUserBlock={handleUserBlock} onUserRoleChange={handleUserRoleChange} onFetchMore={handleFetchMore} />
    </MainLayout>
  );
};
