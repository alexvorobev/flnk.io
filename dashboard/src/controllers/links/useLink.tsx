import { createContext, FC, useCallback, useContext, useState } from 'react';

import { Link } from 'schema/types';

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

  const editLink = useCallback((link?: Link) => {
    setCurrentLink(link);
  }, []);

  const deleteLink = useCallback((id: number) => {
    console.log(id);
  }, []);

  return <LinksContext.Provider value={{ currentLink, editLink, deleteLink }}>{children}</LinksContext.Provider>;
};

export const useLink = () => useContext(LinksContext);
