import { FetchResult, useMutation } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useState } from 'react';

import { deleteLinkMutation, updateLinkMutation } from 'mutations';
import { getLinksQuery } from 'queries';
import { CountedVisitsLink, Query } from 'schema/types';

interface LinksContextType {
  currentLink?: CountedVisitsLink;
  isDeleting?: boolean;
  editLink: (link?: CountedVisitsLink) => void;
  blockLink: (link?: CountedVisitsLink) => void;
  unblockLink: (link?: CountedVisitsLink) => void;
  activateLink: (link?: CountedVisitsLink) => void;
  inactivateLink: (link?: CountedVisitsLink) => void;
  deleteLink?: (id: number) => Promise<FetchResult>;
}

const noop = () => {};

const LinksContext = createContext<LinksContextType>({
  currentLink: undefined,
  isDeleting: false,
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
  const [currentLink, setCurrentLink] = useState<CountedVisitsLink>();
  const [requestDeleteLink, { loading: isDeleting }] = useMutation(deleteLinkMutation);
  const [updateLink] = useMutation(updateLinkMutation);

  const editLink = useCallback((link?: CountedVisitsLink) => {
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
              getLinks: {
                total: (links?.getLinks?.total ?? 0) - 1,
                items: links?.getLinks?.items?.filter((link: CountedVisitsLink) => link.id !== data?.deleteLink.id),
              },
            },
          });
        },
      }),
    [requestDeleteLink],
  );

  const updateLinkBlockedState = useCallback(
    ({ isBlocked, isActive }: { isBlocked?: boolean; isActive?: boolean }, link?: CountedVisitsLink) => {
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
    (link?: CountedVisitsLink) => !!link && updateLinkBlockedState({ isBlocked: true }, link),
    [updateLinkBlockedState],
  );

  const unblockLink = useCallback(
    (link?: CountedVisitsLink) => !!link && updateLinkBlockedState({ isBlocked: false }, link),
    [updateLinkBlockedState],
  );

  const activateLink = useCallback(
    (link?: CountedVisitsLink) => !!link && updateLinkBlockedState({ isActive: true }, link),
    [updateLinkBlockedState],
  );

  const inactivateLink = useCallback(
    (link?: CountedVisitsLink) => !!link && updateLinkBlockedState({ isActive: false }, link),
    [updateLinkBlockedState],
  );

  return (
    <LinksContext.Provider
      value={{ currentLink, isDeleting, editLink, deleteLink, blockLink, unblockLink, activateLink, inactivateLink }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLink = () => useContext(LinksContext);
