import { MainLayout } from 'components/layouts';
import { UsersTable } from 'components/UsersTable';
import { useUsersList } from 'hooks';

export const UsersPage = () => {
  const { users, handleUserBlock } = useUsersList();

  return (
    <MainLayout>
      <UsersTable users={users} onUserBlock={handleUserBlock} />
    </MainLayout>
  );
};
