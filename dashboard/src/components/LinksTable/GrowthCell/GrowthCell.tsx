import { FC } from 'react';
import styled from 'styled-components';

import { GrowthBadge } from 'components/core';

interface Props {
  value?: number;
  change?: number;
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const GrowthValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 8px;
`;

const GrowthCell: FC<Props> = ({ value, change }) => {
  return (
    <Wrapper>
      <GrowthValue>{value}</GrowthValue>
      <GrowthBadge value={change} />
    </Wrapper>
  );
};

export default GrowthCell;
