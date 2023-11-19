import { FaUsers } from 'react-icons/fa';
import { GiHoneycomb } from 'react-icons/gi';
import { MdLineAxis, MdLogout } from 'react-icons/md';
import { PiUserCircleLight } from 'react-icons/pi';

import RoutesPath from '@router/routes';
import { enums } from '@utils';

import { SideBarItem } from './types';

/* export const SidebarItems: Array<SideBarItem> = [
  {
    name: 'Dashboard',
    icon: MdLineAxis,
    route: RoutesPath.private.home.path,
  },
  {
    name: 'Colmeias',
    icon: GiHoneycomb,
    route: RoutesPath.private.hive.path,
  },
  {
    name: 'Perfil',
    icon: PiUserCircleLight,
    route: RoutesPath.private.profile.path,
  },
  {
    name: 'Sair',
    icon: MdLogout,
    route: RoutesPath.private.logout.path,
  },
]; */

export const SidebarItems = (role: enums.EUserRole) => {
  const sideBarOptions: Array<SideBarItem> = [
    {
      name: 'Dashboard',
      icon: MdLineAxis,
      route: RoutesPath.private.home.path,
    },
    {
      name: 'Colmeias',
      icon: GiHoneycomb,
      route: RoutesPath.private.hive.path,
    },
    {
      name: 'Perfil',
      icon: PiUserCircleLight,
      route: RoutesPath.private.profile.path,
    },
    {
      name: 'Sair',
      icon: MdLogout,
      route: RoutesPath.private.logout.path,
    },
  ];

  if (role === enums.EUserRole.ADMIN) {
    sideBarOptions.splice(2, 0, {
      name: 'Usuários',
      icon: FaUsers,
      route: RoutesPath.private.user.path,
    });
  }

  return sideBarOptions;
};
