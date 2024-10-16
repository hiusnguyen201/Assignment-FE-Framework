import { api } from "./index";

export type LoginTypes = {
  email: string;
  password: string;
};
export const login = (data: LoginTypes) => {
  return api.post("/auth/login", data);
};

export type RegisterTypes = LoginTypes & {
  name: string;
  confirmPassword: string;
};
export const register = (data: RegisterTypes) => {
  return api.post("/auth/register", data);
};

export type LogoutTypes = {
  refreshToken: string;
};
export const logout = (data: LogoutTypes) => {
  return api.post("/auth/logout", data);
};
