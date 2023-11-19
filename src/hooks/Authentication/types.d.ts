interface ILogin {
  email: string;
  password: string;
}

interface ILoginResponse {
  tokens: ITokens;
  user: UserInfo;
}

interface ProfileRequestChangePassword {
  old_password: string;
  password: string;
}
