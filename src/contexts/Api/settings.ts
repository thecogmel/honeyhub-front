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
    users: {
      list: '/users/',
      detail: '/users/:id/',
      create: '/users/',
      update: '/users/:id/',
      delete: '/users/:id/',
    },
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
      metrics: '/hives/:id/metrics/',
    },
    collections: {
      list: '/collections/',
      detail: '/collections/:id/',
      create: '/collections/',
      update: '/collections/:id/',
      delete: '/collections/:id/',
    },
  },
};
