import Dashboard from '@pages/Dashboard';
import CreateHive from '@pages/Hives/CreateHive';
import DetailHive from '@pages/Hives/DetailHive';
import EditHive from '@pages/Hives/EditHive';
import Hive from '@pages/Hives/ListHives';
import Profile from '@pages/Profile';
import RoutesPath from '@router/routes';

interface privatePagesProps {
  route: {
    path: string;
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
];

export default privatePages;
