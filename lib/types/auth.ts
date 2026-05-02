import { ID } from "./common";

export type User = {
  id: ID;
  email: string;
  full_name: string;
};

export type RegisterParams = {
  email: string;
  password: string;
  full_name: string;
};

export type RegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RefreshParams = {
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutParams = {
  refreshToken: string;
};