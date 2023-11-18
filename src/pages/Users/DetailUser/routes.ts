import RoutesPath from '@router/routes';

const routes = [
  {
    to: RoutesPath.private.home.path,
    title: 'Home',
  },
  {
    to: RoutesPath.private.user.path,
    title: 'Usuários',
  },
  {
    title: 'Detalhes de um usuário',
  },
];

export default routes;
