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
    logout: { path: '/logout' },
  },
};

export default RoutesPath;
