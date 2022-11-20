import { MainLayout } from 'components/layouts';
import { NavigationTabs } from 'components/NavigationTabs';
import { UsersTable } from 'components/UsersTable';
import { useUsersList } from 'hooks';

export const UsersPage = () => {
  const users = useUsersList();

  return (
    <MainLayout>
      <NavigationTabs />
      <UsersTable users={users} />
    </MainLayout>
  );
};
