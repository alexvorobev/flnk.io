import styled from 'styled-components';

import { Container } from 'components/core';

export const HeaderWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 32px;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

export const AppName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a2d37;
  margin: 0;
`;
