import React, { useCallback, useMemo } from 'react';

import { Button, List, ListItem } from '@mui/material';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@contexts/Auth';

import RoutesPath from '@router/routes';

import img1 from '../../../../assets/images/logos/HoneyHub.svg';
import { SidebarItems } from './MenuItens';
import { ImageLogo } from './styles';

interface IMenuItem {
  name: string;
  icon: IconType;
  route: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { userInfo } = useAuth();

  const checkRoute = useCallback(
    (route: string) => {
      return location.pathname.split('/')[1] === route.split('/')[1];
    },
    [location.pathname]
  );

  const menuItems: Array<IMenuItem> = useMemo(
    () => SidebarItems(userInfo!.role),
    [userInfo]
  );

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 265,
        boxShadow: '#717a831c 0px 7px 30px 0px',
      }}
      component="nav"
    >
      <ListItem
        sx={{
          display: 'flex',
          marginY: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <ImageLogo
          onClick={() => navigate(RoutesPath.private.home.path)}
          src={img1}
        />
      </ListItem>

      {menuItems.map(({ icon: Icon, name, route }) => (
        <ListItem key={name}>
          <Button
            variant={checkRoute(route) ? 'contained' : 'text'}
            fullWidth
            size="large"
            sx={{ height: '47px', fontSize: '18px', marginX: '8px' }}
            startIcon={<Icon />}
            onClick={() => {
              if (route !== RoutesPath.private.logout.path) {
                return navigate(route);
              }
              return logout();
            }}
          >
            {name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
