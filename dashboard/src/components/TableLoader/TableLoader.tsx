import styled from 'styled-components';

import { Loader } from 'components/core';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
`;

export const TableLoader = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
);
