import { LinkForm } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LinksTable } from 'components/LinksTable';

const Dashboard = () => {
  return (
    <MainLayout>
      <LinkForm />
      <LinksTable />
    </MainLayout>
  );
};

export default Dashboard;
