import { useQuery } from '@apollo/client';

import { LinkForm } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LinksTable } from 'components/LinksTable';
import { getLinksQuery } from 'queries/getLinksQuery';

const Dashboard = () => {
  const { data } = useQuery(getLinksQuery);
  console.log({data})

  return (
    <MainLayout>
      <LinkForm />
      <LinksTable />
    </MainLayout>
  );
};

export default Dashboard;
