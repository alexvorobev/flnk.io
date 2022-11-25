import { FC } from 'react';
import { Table, Switch, Button } from 'evergreen-ui';

import { Link } from 'schema/types';
import { useLink } from 'controllers/links/useLink';
import { useAuth } from 'controllers/auth/useAuth';
import { UserInfo } from 'components/core';

interface Props {
  links?: Link[];
}

export const LinksTable: FC<Props> = ({ links }) => {
  const { editLink, deleteLink } = useLink();
  const { me } = useAuth();

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell maxWidth={128}>Hash</Table.TextHeaderCell>
          <Table.TextHeaderCell>URL</Table.TextHeaderCell>
          {me?.role === 'ADMIN' && <Table.TextHeaderCell>User</Table.TextHeaderCell>}
          <Table.TextHeaderCell maxWidth={128}>Visits 24H</Table.TextHeaderCell>
          <Table.TextHeaderCell maxWidth={128}>Active</Table.TextHeaderCell>
          {me?.role === 'ADMIN' && <Table.TextHeaderCell maxWidth={128}>Blocked</Table.TextHeaderCell>}
          <Table.TextHeaderCell maxWidth={180} />
        </Table.Head>
        <Table.Body>
          {links?.map((link) => (
            <Table.Row key={link.id}>
              <Table.TextCell maxWidth={128}>{link.hash}</Table.TextCell>
              <Table.TextCell>{link.path}</Table.TextCell>
              {me?.role === 'ADMIN' && (
                <Table.TextCell>
                  <div style={{ width: 'max-content' }}>
                    <UserInfo user={link.user ?? {}} />
                  </div>
                </Table.TextCell>
              )}
              <Table.TextCell maxWidth={128}>0</Table.TextCell>
              <Table.TextCell maxWidth={128}>
                <Switch checked />
              </Table.TextCell>
              {me?.role === 'ADMIN' && (
                <Table.TextCell maxWidth={128}>
                  <Switch />
                </Table.TextCell>
              )}
              <Table.TextCell maxWidth={180}>
                <Button marginRight={16} onClick={() => editLink(link)}>
                  Edit
                </Button>
                <Button intent='danger' onClick={() => deleteLink(Number.parseInt(link.id ?? '0', 10))}>
                  Delete
                </Button>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
