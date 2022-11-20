import { MainLayout } from 'components/layouts';
import { UsersTable } from 'components/UsersTable';
import { useUsersList } from 'hooks';

export const UsersPage = () => {
  const users = useUsersList();

  return (
    <MainLayout>
      <UsersTable users={users} />
    </MainLayout>
  );
};
