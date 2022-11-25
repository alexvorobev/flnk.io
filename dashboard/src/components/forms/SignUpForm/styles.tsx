import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

export const FormButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;
