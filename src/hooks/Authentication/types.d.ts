interface ILogin {
  email: string;
  password: string;
}

interface ILoginResponse {
  tokens: ITokens;
  user: IUserInfo;
}