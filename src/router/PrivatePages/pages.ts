import Dashboard from '@pages/Dashboard';
import CreateHive from '@pages/Hives/CreateHive';
import DetailHive from '@pages/Hives/DetailHive';
import EditHive from '@pages/Hives/EditHive';
import Hive from '@pages/Hives/ListHives';
import Profile from '@pages/Profile';
import CreateUser from '@pages/Users/CreateUser';
import DetailUser from '@pages/Users/DetailUser';
import EditUser from '@pages/Users/EditUser';
import Users from '@pages/Users/ListUsers';
import RoutesPath from '@router/routes';
import { enums } from '@utils';

interface privatePagesProps {
  route: {
    path: string;
    role: Array<enums.EUserRole>;
  };
  component: React.FC<any>;
}

const privatePages: Array<privatePagesProps> = [
  {
    route: RoutesPath.private.home,
    component: Dashboard,
  },
  {
    route: RoutesPath.private.hive,
    component: Hive,
  },
  {
    route: RoutesPath.private.detailHive,
    component: DetailHive,
  },
  {
    route: RoutesPath.private.profile,
    component: Profile,
  },
  { route: RoutesPath.private.createHive, component: CreateHive },
  { route: RoutesPath.private.editHive, component: EditHive },
  {
    route: RoutesPath.private.user,
    component: Users,
  },
  {
    route: RoutesPath.private.detailUser,
    component: DetailUser,
  },
  {
    route: RoutesPath.private.createUser,
    component: CreateUser,
  },
  {
    route: RoutesPath.private.editUser,
    component: EditUser,
  },
];

export default privatePages;
