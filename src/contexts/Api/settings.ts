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
    resetPassword: '/auth/reset-password/',
    changePassword: '/auth/update-password/',
    confirmEmail: '/auth/confirm-email/',
  },
};
