import styled from 'styled-components';

export const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const UserMainInfo = styled.div`
  position: relative;
  z-index: 1;
  font-size: 14px;
  font-weight: 500;
`;

export const UserEmail = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #1a2d37;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
