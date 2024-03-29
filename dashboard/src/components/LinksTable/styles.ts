import styled from 'styled-components';

export const LinkRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 250px;
  align-items: center;
  grid-gap: 16px;
  padding: 24px;
  border-bottom: 1px solid #ebebeb;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const LinkCode = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1a2d37;
  margin: 0;
`;

export const LinkPath = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #888;
`;

export const LinkControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const LinksTableEmpty = styled.div`
  font-size: 1.125rem;
  line-height: 1.8rem;
  padding: 64px 24px;
  color: #c1c4d6;
  text-align: center;
`;
