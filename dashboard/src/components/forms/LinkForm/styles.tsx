import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 150px;
  grid-gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background-color: #F9FAFC;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
