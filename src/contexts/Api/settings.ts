export const endpoints = {
  brasilAPi: {
    cep: '/cep/v2/:cep',
  },
  core: {
    cities: { list: '/core/cities/' },
  },
  auth: {
    login: '/login/',
    profile: '/users/1/',
    register: '/auth/register/',
    users: '/users/',
    resetPassword: '/auth/reset-password/',
    changePassword: '/auth/update-password/',
    confirmEmail: '/auth/confirm-email/',
  },
  private: {
    hives: {
      list: '/hives/',
      detail: '/hives/:id/',
      create: '/hives/',
      update: '/hives/:id/',
      delete: '/hives/:id/',
    },
  },
};
