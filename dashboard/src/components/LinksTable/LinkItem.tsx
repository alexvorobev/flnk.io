import styled from 'styled-components';

import { Button } from 'components/core';

const LinkRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 250px;
  align-items: center;
  grid-gap: 16px;
  padding: 24px;
  border-bottom: 1px solid #ebebeb;
`;

const LinkCode = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const LinkPath = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #888;
`;

const LinkControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const LinkItem = () => {
  return (
    <LinkRow>
      <LinkCode>123456</LinkCode>
      <LinkPath href='https://google.com' target='_blank'>
        https://google.com
      </LinkPath>
      <LinkControls>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </LinkControls>
    </LinkRow>
  );
};
