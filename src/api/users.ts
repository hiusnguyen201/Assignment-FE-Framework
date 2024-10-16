import { api } from "./index";

export type CreateUserTypes = {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
};
export const createUser = (data: CreateUserTypes) => {
  return api.post("/users", data);
};

export const getAllUser = () => {
  return api.get(`/users`);
};

export const getUser = (identify: string) => {
  return api.get(`/users/${identify}`);
};

export type UpdateUserTypes = {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
};
export const updateUser = (identify: string, data: UpdateUserTypes) => {
  return api.patch(`/users/${identify}`, data);
};

export const deleteUser = (identify: string) => {
  return api.delete(`/users/${identify}`);
};
