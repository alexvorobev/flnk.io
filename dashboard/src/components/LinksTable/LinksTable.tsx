import { FC, useCallback, useState } from 'react';
import { Table, Switch, Button, toaster, Dialog, Alert, Pane } from 'evergreen-ui';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { RxUpdate, RxLink2 } from 'react-icons/rx';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CountedVisitsLink } from 'schema/types';
import { useLink } from 'controllers/links/useLink';
import { useAuth } from 'controllers/auth/useAuth';
import { UserInfo } from 'components/core';
import { useThreshold } from 'hooks';

import GrowthCell from './GrowthCell';

interface Props {
  links?: CountedVisitsLink[];
  onSearch?: (search: string) => void;
  onFetchMore?: () => void;
  onRefetch?: () => void;
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

const threshold = 500;

export const LinksTable: FC<Props> = ({ links, onSearch, onFetchMore, onRefetch }) => {
  const { editLink, deleteLink, blockLink, unblockLink, activateLink, inactivateLink } = useLink();
  const { me } = useAuth();
  const [linkToDelete, setLinkToDelete] = useState<CountedVisitsLink>();
  const handleSearch = useThreshold<string>(onSearch, threshold);
  const isCopyAvailable = !!navigator.clipboard && !!navigator.clipboard.writeText;

  const handleConfirmedDelete = useCallback(async () => {
    if (linkToDelete) {
      await deleteLink?.(Number(linkToDelete.id));
      setLinkToDelete(undefined);
    }
  }, [deleteLink, linkToDelete]);

  return (
    <InfiniteScroll
      next={() => {
        onFetchMore?.();
      }}
      loader={<></>}
      endMessage={<></>}
      hasMore={!!onFetchMore}
      dataLength={links?.length ?? 0}
    >
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
            <Table.SearchHeaderCell placeholder='Search...' maxWidth={220} onChange={handleSearch} />
            <Table.TextHeaderCell>URL</Table.TextHeaderCell>
            {me?.role === 'ADMIN' && <Table.TextHeaderCell>User</Table.TextHeaderCell>}
            <Table.TextHeaderCell maxWidth={128}>Visits 24H</Table.TextHeaderCell>
            <Table.TextHeaderCell maxWidth={128}>Active</Table.TextHeaderCell>
            {me?.role === 'ADMIN' && <Table.TextHeaderCell maxWidth={128}>Blocked</Table.TextHeaderCell>}
            <Table.TextHeaderCell textAlign='right' maxWidth={96}>
              <Button appearance='minimal' padding={0} height={32} width={32} onClick={onRefetch}>
                <RxUpdate />
              </Button>
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {links?.map((link) => (
              <Table.Row key={link.id}>
                <Table.TextCell maxWidth={220}>
                  <Pane display='flex' alignItems='center'>
                    <Pane width='100%'>{link.hash}</Pane>
                    {isCopyAvailable && (
                      <Button
                        marginLeft={16}
                        width={24}
                        height={24}
                        minWidth={24}
                        paddingX={0}
                        onClick={() => copyToClipboard(link.hash)}
                      >
                        <RxLink2 />
                      </Button>
                    )}
                  </Pane>
                </Table.TextCell>
                <Table.TextCell>{link.path}</Table.TextCell>
                {me?.role === 'ADMIN' && (
                  <Table.TextCell>
                    <div style={{ width: 'max-content' }}>
                      <UserInfo user={link.user ?? {}} />
                    </div>
                  </Table.TextCell>
                )}
                <Table.TextCell maxWidth={128}>
                  <GrowthCell value={link?.visits?.current ?? 0} change={link?.visits?.change ?? 0} />
                </Table.TextCell>
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
                <Table.TextCell maxWidth={96}>
                  <Button padding={0} height={32} width={32} marginRight={8} onClick={() => editLink(link)}>
                    <BsPencil />
                  </Button>
                  <Button padding={0} height={32} width={32} intent='danger' onClick={() => setLinkToDelete(link)}>
                    <BsTrash />
                  </Button>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </InfiniteScroll>
  );
};
