import { Container } from 'components/core';

import { AppName, HeaderWrapper } from './styles';

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <AppName>flink.io // Dashboard</AppName>
      </Container>
    </HeaderWrapper>
  );
};
