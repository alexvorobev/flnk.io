import { FC } from 'react';
import { Table, Switch, Button } from 'evergreen-ui';

import { Link } from 'schema/types';
import { useLink } from 'controllers/links/useLink';

interface Props {
  links?: Link[];
}

export const LinksTable: FC<Props> = ({ links }) => {
  const { editLink, deleteLink } = useLink();

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell maxWidth={128}>Hash</Table.TextHeaderCell>
          <Table.TextHeaderCell>URL</Table.TextHeaderCell>
          <Table.TextHeaderCell maxWidth={128}>Visits</Table.TextHeaderCell>
          <Table.TextHeaderCell maxWidth={128}>Active</Table.TextHeaderCell>
          <Table.TextHeaderCell maxWidth={180} />
        </Table.Head>
        <Table.Body>
          {links?.map((link) => (
            <Table.Row key={link.id}>
              <Table.TextCell maxWidth={128}>{link.hash}</Table.TextCell>
              <Table.TextCell>{link.path}</Table.TextCell>
              <Table.TextCell maxWidth={128}>0</Table.TextCell>
              <Table.TextCell maxWidth={128}>
                <Switch />
              </Table.TextCell>
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
