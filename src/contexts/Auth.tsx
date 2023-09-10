import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import SplashScreen from 'components/SplashScreen';
import useAuthentication from 'hooks/Authentication';
import { useQueryClient, useMutation, useQuery } from 'react-query';

import { useApi } from './Api';

interface IAuthContextValues {
  userInfo?: UserInfo;
  authorized: boolean;
  login: (email: string, password: string) => Promise<ILoginResponse>;
  logout: () => void;
  updateUserInfo: () => void;
}

const AuthContext = createContext<IAuthContextValues>({} as IAuthContextValues);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoadingInitialValues, setIsLoadingInitialValues] = useState(true);
  const [accessToken, setAccessToken] = useState<string>();

  const { performLogin, getProfile } = useAuthentication();
  const { addInterceptors, cleanInterceptors } = useApi();
  const queryClient = useQueryClient();

  const fetchUserInfo = useQuery('userInfo', getProfile, {
    onError: () => {
      localStorage.removeItem('tokens');
    },
    onSettled: () => setIsLoadingInitialValues(false),
    staleTime: Infinity,
    enabled: !!accessToken,
  });

  const requestLogin = useMutation(
    ({ email, password }: ILogin) => performLogin(email, password),
    {
      onSuccess: (data) => {
        localStorage.setItem('tokens', JSON.stringify(data.tokens));

        setAccessToken(data.tokens.access);
        addInterceptors(data.tokens, logout);

        queryClient.setQueryData('userInfo', data.user);
      },
    }
  );

  const logout = useCallback(async () => {
    cleanInterceptors();

    localStorage.removeItem('tokens');
    setAccessToken(undefined);

    queryClient.clear();
  }, [cleanInterceptors, queryClient]);

  const login = useCallback(
    async (email: string, password: string) => {
      cleanInterceptors();
      return requestLogin.mutateAsync({ email, password });
    },
    [cleanInterceptors, requestLogin]
  );

  useEffect(() => {
    if (accessToken) {
      return;
    }

    const tokens = localStorage.getItem('tokens');

    if (tokens) {
      const parsedTokens: ITokens = JSON.parse(tokens);

      addInterceptors(parsedTokens, logout);

      setAccessToken(parsedTokens.access);
    } else {
      setIsLoadingInitialValues(false);
    }
  }, [accessToken, addInterceptors, logout]);

  return (
    <AuthContext.Provider
      value={{
        userInfo: queryClient.getQueryData('userInfo'),
        authorized: !!fetchUserInfo.data,
        updateUserInfo: fetchUserInfo.refetch,
        login,
        logout,
      }}
    >
      {isLoadingInitialValues ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
