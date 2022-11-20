import { TabNavigation, Tab } from 'evergreen-ui';
import { useLocation, useNavigate } from 'react-router-dom';

import { PROTECTED_ROUTES } from 'routes';

const menuLinks = [
  { label: 'Links', to: PROTECTED_ROUTES.HOME },
  { label: 'Users', to: PROTECTED_ROUTES.USERS },
];

export const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TabNavigation>
      {menuLinks.map((tab, index) => (
        <Tab
          key={tab.label}
          is='div'
          size='large'
          height={36}
          paddingX={20}
          onSelect={() => navigate(tab.to)}
          id={tab.label}
          isSelected={location.pathname === tab.to}
        >
          {tab.label}
        </Tab>
      ))}
    </TabNavigation>
  );
};
