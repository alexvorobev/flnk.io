import { FC, useCallback, useState } from 'react';
import { Table, Switch, Button, toaster, Dialog, Alert } from 'evergreen-ui';
import { BsLink45Deg } from 'react-icons/bs';

import { Link } from 'schema/types';
import { useLink } from 'controllers/links/useLink';
import { useAuth } from 'controllers/auth/useAuth';
import { UserInfo } from 'components/core';

interface Props {
  links?: Link[];
}

const copyToClipboard = (link: string) => {
  navigator.clipboard
    .writeText(`${process.env.REACT_APP_URL}/${link}`)
    .then(() => {
      toaster.success('Copied!', { description: 'Link copied to clipboard' });
    })
    .catch(() => {
      toaster.danger('Failed!', {
        description: 'Failed to copy link to clipboard',
      });
    });
};
// , blockLink, unblockLink, activateLink, inactivateLink
export const LinksTable: FC<Props> = ({ links }) => {
  const { editLink, deleteLink, blockLink, unblockLink, activateLink, inactivateLink } = useLink();
  const { me } = useAuth();
  const [linkToDelete, setLinkToDelete] = useState<Link>();

  const handleConfirmedDelete = useCallback(async () => {
    if (linkToDelete) {
      await deleteLink?.(Number(linkToDelete.id));
      setLinkToDelete(undefined);
    }
  }, [deleteLink, linkToDelete]);

  return (
    <div>
      <Dialog
        isShown={!!linkToDelete}
        title='Are you sure you want to delete link?'
        intent='danger'
        onConfirm={handleConfirmedDelete}
        onCancel={() => setLinkToDelete(undefined)}
        onCloseComplete={() => setLinkToDelete(undefined)}
        confirmLabel='Delete'
      >
        {linkToDelete && (
          <Alert intent='danger' title={`${process.env.REACT_APP_URL}/${linkToDelete?.hash}`} hasIcon={false}>
            {linkToDelete?.path}
          </Alert>
        )}
      </Dialog>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell maxWidth={220}>Hash</Table.SearchHeaderCell>
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
              <Table.TextCell maxWidth={220}>
                {link.hash}
                <Button
                  marginLeft={16}
                  width={24}
                  height={24}
                  minWidth={24}
                  paddingX={0}
                  onClick={() => copyToClipboard(link.hash)}
                >
                  <BsLink45Deg />
                </Button>
              </Table.TextCell>
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
                <Switch
                  checked={link.isActive ?? false}
                  onChange={() => (link.isActive ? inactivateLink(link) : activateLink(link))}
                />
              </Table.TextCell>
              {me?.role === 'ADMIN' && (
                <Table.TextCell maxWidth={128}>
                  <Switch
                    checked={link.isBlocked ?? false}
                    onChange={() => (!link.isBlocked ? blockLink(link) : unblockLink(link))}
                  />
                </Table.TextCell>
              )}
              <Table.TextCell maxWidth={180}>
                <Button marginRight={16} onClick={() => editLink(link)}>
                  Edit
                </Button>
                <Button intent='danger' onClick={() => setLinkToDelete(link)}>
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
