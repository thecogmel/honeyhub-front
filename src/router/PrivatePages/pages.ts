import Dashboard from '@pages/Dashboard';
import CreateHive from '@pages/Hives/CreateHive';
import DetailHive from '@pages/Hives/DetailHive';
import Hive from '@pages/Hives/ListHives';
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
  { route: RoutesPath.private.createHive, component: CreateHive },
];

export default privatePages;
