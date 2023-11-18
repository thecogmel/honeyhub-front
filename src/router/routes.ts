const RoutesPath = {
  auth: {
    root: '/login',
    login: '/login',
    forgotPassword: '/esqueci-minha-senha',
    confirmEmail: '/confirmar-email/',
  },
  private: {
    home: {
      path: '/dashboard',
    },
    hive: { path: '/colmeia' },
    detailHive: { path: '/colmeia/:hiveId/' },
    createHive: { path: '/colmeia/criar/' },
    editHive: { path: '/colmeia/editar/:hiveId/' },
    user: { path: '/usuario' },
    detailUser: { path: '/usuario/:userId/' },
    editUser: { path: '/usuario/editar/:userId/' },
    createUser: { path: '/usuario/criar/' },
    profile: { path: '/perfil' },
    logout: { path: '/logout' },
  },
};

export default RoutesPath;
