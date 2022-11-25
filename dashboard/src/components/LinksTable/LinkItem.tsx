import { FC, useMemo } from 'react';
import { Button } from 'evergreen-ui';

import { Link } from 'schema/types';
import { useLink } from 'controllers/links/useLink';

import { LinkCode, LinkControls, LinkPath, LinkRow } from './styles';

interface Props {
  link: Link;
}

export const LinkItem: FC<Props> = ({ link }) => {
  const { editLink, deleteLink } = useLink();
  const linkId = useMemo(() => Number.parseInt(link.id ?? '0', 10), [link]);

  return (
    <LinkRow>
      <LinkCode>{link.hash}</LinkCode>
      <LinkPath href={link.path} target='_blank'>
        {link.path}
      </LinkPath>
      <LinkControls>
        <Button onClick={() => editLink(link)}>Edit</Button>
        <Button onClick={() => deleteLink(linkId)}>Delete</Button>
      </LinkControls>
    </LinkRow>
  );
};
