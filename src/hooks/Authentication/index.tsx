import { useCallback } from 'react';

import { endpoints, useApi } from 'contexts/Api';

interface IRequestChangePasswordResponse {
  message: string;
}

const useAuthentication = () => {
  const { request } = useApi();

  const performLogin = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };

      const response = await request<ILoginResponse>({
        method: 'post',
        url: endpoints.auth.login,
        data,
      });

      return response.data;
    },
    [request]
  );

  const getProfile = useCallback(async () => {
    const response = await request<UserInfo>({
      method: 'get',
      url: endpoints.auth.profile,
    });

    return response.data;
  }, [request]);

  const requestChangePassword = useCallback(
    async (email: string) => {
      const response = await request<IRequestChangePasswordResponse>({
        method: 'post',
        url: endpoints.auth.resetPassword,
        data: { email },
      });

      return response.data;
    },
    [request]
  );

  const changePassword = useCallback(
    async (password: string, token: string) => {
      const response = await request({
        method: 'post',
        url: endpoints.auth.changePassword,
        data: { password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    [request]
  );

  const confirmEmail = useCallback(
    async (client_id: string, user_name: string, confirmation_code: string) => {
      const response = await request({
        method: 'post',
        url: endpoints.auth.confirmEmail,
        data: { client_id, user_name, confirmation_code },
      });

      return response.data;
    },
    [request]
  );

  return {
    getProfile,
    performLogin,
    requestChangePassword,
    changePassword,
    confirmEmail,
  };
};

export default useAuthentication;
