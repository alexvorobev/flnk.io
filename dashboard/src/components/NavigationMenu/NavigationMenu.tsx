import { Link, LinkProps, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PROTECTED_ROUTES } from 'routes';

const menuLinks = [
  { label: 'Links', to: PROTECTED_ROUTES.HOME },
  { label: 'Users', to: PROTECTED_ROUTES.USERS },
];

const StyledNavigationMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  font-size: 1.4rem;
  line-height: 2.4rem;

  &::before {
    content: '';
    width: 1px;
    height: 32px;
    margin-right: 12px;
    background-color: #edeff5;
  }
`;

interface NavigationLinkProps extends LinkProps {
  isActive?: boolean;
}

const StyledNavigationLink = styled(Link)<NavigationLinkProps>`
  font-weight: 500;
  color: #101840;
  text-decoration: none;
  border-radius: 4px;
  padding: 4px 12px;
  display: block;

  &:hover {
    color: #3366FF;
    background-color: #F2F4FF;
  }

  ${({ isActive }) =>
    isActive &&
    `
    color: #3366FF;
  `}
`;

export const NavigationMenu = () => {
  const location = useLocation();
  
  return (
    <StyledNavigationMenu>
      {menuLinks.map((tab, index) => (
        <StyledNavigationLink
          key={tab.label}
          to={tab.to}
          isActive={location.pathname === tab.to}
        >
          {tab.label}
        </StyledNavigationLink>
      ))}
    </StyledNavigationMenu>
  );
};
