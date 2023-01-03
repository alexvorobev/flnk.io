import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import styled from 'styled-components';

const FieldErrorMessageWrapper = styled.div`
  display: grid;
  grid-template-columns: 12px 1fr;
  grid-gap: 2px;
  align-items: center;
  padding-top: 8px;
  color: #ff4d4f;
  font-size: 12px;

  & > * {
    display: block;
  }
`;

interface Props {
  message?: React.ReactNode | string;
}

export const FieldErrorMessage: React.FC<Props> = ({ message }) =>
  message ? (
    <FieldErrorMessageWrapper>
      <BiErrorCircle />
      <span>{message}</span>
    </FieldErrorMessageWrapper>
  ) : null;
