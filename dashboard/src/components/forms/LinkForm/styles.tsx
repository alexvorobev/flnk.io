import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: auto 1fr 1fr 150px;
  grid-gap: 16px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9fafc;
  border: 1px solid #edeff5;
  margin-bottom: 24px;
  align-items: grid-start;

  @media (max-width: 1200px) {
    grid-template-columns: auto 1fr;

    & > *:nth-child(n + 3) {
      grid-column: 1 / -1;
    }
  }
`;

export const AppLinkUrl = styled.p`
  display: block;
  line-height: 40px;
`;
