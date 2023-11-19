import { enums } from '@utils';

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
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    hive: {
      path: '/colmeia',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    detailHive: {
      path: '/colmeia/:hiveId/',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    createHive: {
      path: '/colmeia/criar/',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    editHive: {
      path: '/colmeia/editar/:hiveId/',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    user: {
      path: '/usuario',
      role: [enums.EUserRole.ADMIN, enums.EUserRole.SUPPORT],
    },
    detailUser: {
      path: '/usuario/:userId/',
      role: [enums.EUserRole.ADMIN, enums.EUserRole.SUPPORT],
    },
    editUser: {
      path: '/usuario/editar/:userId/',
      role: [enums.EUserRole.ADMIN, enums.EUserRole.SUPPORT],
    },
    createUser: {
      path: '/usuario/criar/',
      role: [enums.EUserRole.ADMIN, enums.EUserRole.SUPPORT],
    },
    profile: {
      path: '/perfil',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
    logout: {
      path: '/logout',
      role: [
        enums.EUserRole.ADMIN,
        enums.EUserRole.MEMBER,
        enums.EUserRole.SUPPORT,
      ],
    },
  },
};

export default RoutesPath;
