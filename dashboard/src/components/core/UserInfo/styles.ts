import styled from 'styled-components';

export const UserPhoto = styled.div`
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #1a2d37;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

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
  font-size: 16px;
  font-weight: 800;
`;

export const UserPopup = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 16px;
  padding-top: 48px;
  top: -16px;
  right: -16px;
  width: max-content;
  min-width: 100%;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);

  hr {
    border: 1px solid #eaeaea;
    margin-left: -16px;
    width: calc(100% + 32px);
  }
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
