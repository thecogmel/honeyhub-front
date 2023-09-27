import { GiHoneycomb } from 'react-icons/gi';
import { MdLineAxis, MdLogout } from 'react-icons/md';

import RoutesPath from '@router/routes';

import { SideBarItem } from './types';

export const SidebarItems: Array<SideBarItem> = [
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
    name: 'Sair',
    icon: MdLogout,
    route: RoutesPath.private.logout.path,
  },
];
