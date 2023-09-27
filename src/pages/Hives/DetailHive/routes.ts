import RoutesPath from '@router/routes';

const routes = [
  {
    to: RoutesPath.private.home.path,
    title: 'Home',
  },
  {
    to: RoutesPath.private.hive.path,
    title: 'Colmeias',
  },
  {
    title: 'Detalhes de uma colmeia',
  },
];

export default routes;
