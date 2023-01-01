import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { LinkForm } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LinksTable } from 'components/LinksTable';
import { LinksProvider } from 'controllers/links/useLink';
import { getLinksQuery } from 'queries';
import { CountedVisitsLink, Query } from 'schema/types';

const Dashboard = () => {
  const { data, loading, refetch, fetchMore } = useQuery<Query>(getLinksQuery);
  const links = useMemo((): CountedVisitsLink[] => data?.getLinks?.items ?? [], [data]);
  const total = useMemo((): number => data?.getLinks?.total ?? 0, [data]);

  const handleSearch = useCallback(
    (search: string) => {
      refetch({ search });
    },
    [refetch],
  );

  const handleFetchMore = useCallback(() => {
    const cursor = links?.[links.length - 1]?.id;
    fetchMore({
      variables: { cursor },
      updateQuery: (previous, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previous;

        return {
          getLinks: {
            ...fetchMoreResult.getLinks,
            items: [...(previous?.getLinks?.items ?? []), ...(fetchMoreResult?.getLinks?.items ?? [])],
          },
        };
      },
    });
  }, [links, fetchMore]);

  return (
    <LinksProvider>
      <MainLayout>
        <LinkForm />
        <LinksTable
          links={links ?? []}
          isLoading={loading}
          onSearch={handleSearch}
          onRefetch={() => refetch({})}
          onFetchMore={total > links.length ? handleFetchMore : undefined}
        />
      </MainLayout>
    </LinksProvider>
  );
};

export default Dashboard;
