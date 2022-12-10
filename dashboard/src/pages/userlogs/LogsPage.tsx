import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { UserLogsFilter } from 'components/forms';
import { MainLayout } from 'components/layouts';
import { LogsTable } from 'components/LogsTable';
import { useUsersList } from 'hooks';
import { getLogsQuery } from 'queries/getLogsQuery';
import { Query } from 'schema/types';

type FilterType = {
  users?: string[];
  actions?: string[];
  entities?: string[];
  dates?: [Date, Date];
  body?: string;
};

export const LogsPage = () => {
  const { users } = useUsersList();
  const [fetchLogs, { data, refetch: refetchLogs, fetchMore }] = useLazyQuery<Query>(getLogsQuery);
  const { items: logs } = data?.getLogs ?? {};
  const [filter, setFilter] = useState<FilterType>({
    users: undefined,
    actions: undefined,
    entities: undefined,
    dates: undefined,
    body: undefined,
  });

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    if (
      filter.users?.length ||
      filter.actions?.length ||
      filter.entities?.length ||
      filter.dates?.length ||
      filter.body
    ) {
      refetchLogs({
        ...filter,
      });
    } else {
      fetchLogs();
    }
  }, [filter, refetchLogs, fetchLogs]);

  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        cursor: logs?.[logs.length - 1].id,
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousData;

        return {
          getLogs: {
            ...fetchMoreResult.getLogs,
            items: [...(previousData?.getLogs?.items ?? []), ...(fetchMoreResult?.getLogs?.items ?? [])],
          },
        };
      },
    });
  }, [fetchMore, logs]);

  return (
    <MainLayout>
      <UserLogsFilter users={users} setFilter={setFilter} />
      <LogsTable logs={logs ?? []} onFetchMore={handleFetchMore} />
    </MainLayout>
  );
};
