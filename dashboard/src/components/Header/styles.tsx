import styled from 'styled-components';

import { Container } from 'components/core';

export const HeaderWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  border-bottom: 1px solid #edeff5;
  margin-bottom: 32px;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const AppName = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #1a2d37;
  margin: 0;
`;
