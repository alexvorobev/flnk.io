import { FC } from 'react';

import { Link } from 'schema/types';

import { LinkItem } from './LinkItem';

interface Props {
  links?: Link[];
}

export const LinksTable: FC<Props> = ({ links }) => {
  return (
    <div>
      {links?.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </div>
  );
};
