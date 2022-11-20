import { useQuery } from '@apollo/client';

import { LinkForm } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LinksTable } from 'components/LinksTable';
import { NavigationTabs } from 'components/NavigationTabs';
import { LinksProvider } from 'controllers/links/useLink';
import { getLinksQuery } from 'queries';
import { Query } from 'schema/types';

const Dashboard = () => {
  const { data } = useQuery<Query>(getLinksQuery);

  const links = data?.getLinks || [];

  return (
    <LinksProvider>
      <MainLayout>
        <NavigationTabs />
        <LinkForm />
        <LinksTable links={links} />
      </MainLayout>
    </LinksProvider>
  );
};

export default Dashboard;
