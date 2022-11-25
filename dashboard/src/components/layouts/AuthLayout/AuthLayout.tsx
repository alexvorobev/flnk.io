import { FC } from 'react';
import styled from 'styled-components';
import { Pane } from 'evergreen-ui';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: flex-start;
  background-color: #f9fafc;
`;

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Pane
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        background='white'
        borderRight='default'
        borderRadius={4}
        maxWidth={480}
        height='100vh'
      >
        <Pane maxWidth={380} paddingX={24} paddingY={32}>
          {children}
        </Pane>
      </Pane>
    </Wrapper>
  );
};
