import { useMutation } from '@apollo/client';
import { createContext, FC, useCallback, useContext, useState } from 'react';

import { deleteLinkMutation } from 'mutations';
import { getLinksQuery } from 'queries';
import { Link, Query } from 'schema/types';

interface LinksContextType {
  currentLink?: Link;
  editLink: (link?: Link) => void;
  deleteLink: (id: number) => void;
}

const noop = () => {};

const LinksContext = createContext<LinksContextType>({
  currentLink: undefined,
  editLink: noop,
  deleteLink: noop,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const LinksProvider: FC<ProviderProps> = ({ children }) => {
  const [currentLink, setCurrentLink] = useState<Link>();
  const [requestDeleteLink] = useMutation(deleteLinkMutation);

  const editLink = useCallback((link?: Link) => {
    setCurrentLink(link);
  }, []);

  const deleteLink = useCallback(
    (id: number) => {
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
      });
    },
    [requestDeleteLink],
  );

  return <LinksContext.Provider value={{ currentLink, editLink, deleteLink }}>{children}</LinksContext.Provider>;
};

export const useLink = () => useContext(LinksContext);
