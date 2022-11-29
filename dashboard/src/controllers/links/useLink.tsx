import { FetchResult, useMutation } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useState } from 'react';

import { deleteLinkMutation, updateLinkMutation } from 'mutations';
import { getLinksQuery } from 'queries';
import { Link, Query } from 'schema/types';

interface LinksContextType {
  currentLink?: Link;
  editLink: (link?: Link) => void;
  blockLink: (link?: Link) => void;
  unblockLink: (link?: Link) => void;
  activateLink: (link?: Link) => void;
  inactivateLink: (link?: Link) => void;
  deleteLink?: (id: number) => Promise<FetchResult>;
}

const noop = () => {};

const LinksContext = createContext<LinksContextType>({
  currentLink: undefined,
  editLink: noop,
  blockLink: noop,
  unblockLink: noop,
  activateLink: noop,
  inactivateLink: noop,
  deleteLink: undefined,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const LinksProvider: FC<ProviderProps> = ({ children }) => {
  const [currentLink, setCurrentLink] = useState<Link>();
  const [requestDeleteLink] = useMutation(deleteLinkMutation);
  const [updateLink] = useMutation(updateLinkMutation);

  const editLink = useCallback((link?: Link) => {
    setCurrentLink(link);
  }, []);

  const deleteLink = useCallback(
    (id: number) =>
      requestDeleteLink({
        variables: {
          id,
        },
        update(cache, { data }) {
          const links = cache.readQuery<Query>({ query: getLinksQuery });
          cache.writeQuery({
            query: getLinksQuery,
            data: {
              getLinks: links?.getLinks?.filter((link: Link) => link.id !== data?.deleteLink.id),
            },
          });
        },
      }),
    [requestDeleteLink],
  );

  const updateLinkBlockedState = useCallback(
    ({ isBlocked, isActive }: { isBlocked?: boolean; isActive?: boolean }, link?: Link) => {
      if (link) {
        updateLink({
          variables: {
            updateLinkInput: {
              id: Number(link.id),
              isBlocked,
              isActive,
            },
          },
        });
      }
    },
    [updateLink],
  );

  const blockLink = useCallback(
    (link?: Link) => !!link && updateLinkBlockedState({ isBlocked: true }, link),
    [updateLinkBlockedState],
  );

  const unblockLink = useCallback(
    (link?: Link) => !!link && updateLinkBlockedState({ isBlocked: false }, link),
    [updateLinkBlockedState],
  );

  const activateLink = useCallback(
    (link?: Link) => !!link && updateLinkBlockedState({ isActive: true }, link),
    [updateLinkBlockedState],
  );

  const inactivateLink = useCallback(
    (link?: Link) => !!link && updateLinkBlockedState({ isActive: false }, link),
    [updateLinkBlockedState],
  );

  return (
    <LinksContext.Provider
      value={{ currentLink, editLink, deleteLink, blockLink, unblockLink, activateLink, inactivateLink }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLink = () => useContext(LinksContext);
