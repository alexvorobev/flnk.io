import { useCallback } from 'react';
import { useQuery } from '@apollo/client';

import { LinkForm } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LinksTable } from 'components/LinksTable';
import { LinksProvider } from 'controllers/links/useLink';
import { getLinksQuery } from 'queries';
import { Query } from 'schema/types';

const Dashboard = () => {
  const { data, refetch } = useQuery<Query>(getLinksQuery);
  const links = data?.getLinks || [];
  
  const handleSearch = useCallback((search: string) => {
    refetch({ search });
  }, [refetch])

  return (
    <LinksProvider>
      <MainLayout>
        <LinkForm />
        <LinksTable links={links} onSearch={handleSearch} />
      </MainLayout>
    </LinksProvider>
  );
};

export default Dashboard;
