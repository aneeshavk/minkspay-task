export interface LoginData {
  email: string;
  password: string;
}

export interface TokenModel {
  token: string;
  id?: number;
}
