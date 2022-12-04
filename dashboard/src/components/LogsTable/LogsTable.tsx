import { FC } from 'react';
import { Badge, Pane, Table } from 'evergreen-ui';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import { UserLog } from 'schema/types';
import { UserInfo } from 'components/core';

interface Props {
  logs?: UserLog[];
  onFetchMore?: () => void;
}

enum UserLogAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

enum UserLogActionEntity {
  LINK = 'LINK',
  USER = 'USER',
}

const getActionBadgeColor = (action: string) => {
  switch (action) {
    case UserLogAction.CREATE:
      return 'green';
    case UserLogAction.UPDATE:
      return 'blue';
    case UserLogAction.DELETE:
      return 'red';
    case UserLogAction.LOGIN:
      return 'green';
    case UserLogAction.LOGOUT:
      return 'orange';
    default:
      return 'blue';
  }
};

const getActionEntityBadgeColor = (entity: string) => {
  switch (entity) {
    case UserLogActionEntity.USER:
      return 'blue';
    case UserLogActionEntity.LINK:
      return 'green';
    default:
      return 'green';
  }
};

export const LogsTable: FC<Props> = ({ logs, onFetchMore }) => {
  if (!logs) {
    return null;
  }

  return (
    <>
      <InfiniteScroll
        next={() => {
          onFetchMore?.();
        }}
        loader={<></>}
        endMessage={<></>}
        hasMore={!!onFetchMore}
        dataLength={logs?.length ?? 0}
      >
        <Table marginBottom={64}>
          <Table.Head>
            <Table.TextHeaderCell maxWidth={240}>User</Table.TextHeaderCell>
            <Table.TextHeaderCell maxWidth={120}>Action</Table.TextHeaderCell>
            <Table.TextHeaderCell maxWidth={120}>Entity</Table.TextHeaderCell>
            <Table.TextHeaderCell>Data</Table.TextHeaderCell>
            <Table.TextHeaderCell maxWidth={140}>Date</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {logs.map((log) => (
              <Table.Row key={log.id}>
                <Table.TextCell maxWidth={240}>
                  <Pane maxWidth='max-content'>
                    <UserInfo user={log.author} />
                  </Pane>
                </Table.TextCell>
                <Table.TextCell maxWidth={120}>
                  <Badge color={getActionBadgeColor(log.action)}>{log.action}</Badge>
                </Table.TextCell>
                <Table.TextCell maxWidth={120}>
                  <Badge color={getActionEntityBadgeColor(log.entity)}>{log.entity}</Badge>
                </Table.TextCell>
                <Table.TextCell>{log.entityData}</Table.TextCell>
                <Table.TextCell maxWidth={140}>{moment(`${log.createdAt}`).format('DD.MM.YYYY HH:mm')}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </InfiniteScroll>
    </>
  );
};
