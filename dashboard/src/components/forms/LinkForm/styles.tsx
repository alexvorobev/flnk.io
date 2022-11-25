import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 150px;
  grid-gap: 16px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9fafc;
  border: 1px solid #edeff5;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
