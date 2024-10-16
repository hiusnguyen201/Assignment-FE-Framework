import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

import {
  getAllUser as apiGetAllUser,
  getUser as apiGetUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
  createUser as apiCreateUser,
  UpdateUserTypes,
  CreateUserTypes,
} from "#src/api";

type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserState = {
  isLoading: boolean;
  error: any | null;
  deletedIds: string[];
  item: User | null;
  list: User[] | [];
  isUpdated: boolean;
};

const initialState: UserState = {
  isLoading: false,
  error: null,
  deletedIds: [],
  list: [],
  item: null,
  isUpdated: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isUpdated = false;
    },
    hasError(state, action: PayloadAction<any | null>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isUpdated = false;
    },
    getAll(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
      state.isUpdated = false;
    },
    getOne(state, action: PayloadAction<User>) {
      state.item = action.payload;
      state.isLoading = false;
      state.error = null;
      state.isUpdated = false;
    },
    create(state, action: PayloadAction<User>) {
      state.list = [...state.list, action.payload];
      state.isLoading = false;
      state.error = null;
      state.isUpdated = true;
    },
    update(state, action: PayloadAction<User>) {
      state.list = state.list.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isUpdated = true;
      state.isLoading = false;
      state.error = null;
    },
    delete(state, action: PayloadAction<User>) {
      state.list = state.list.filter(
        (item) => item._id !== action.payload._id
      );
      state.isUpdated = true;
      state.deletedIds.push(action.payload._id);
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer } = usersSlice;
export default reducer;

export const getAllUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      const { data } = await apiGetAllUser();
      dispatch(actions.getAll(data.data.users));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const getUser = (identify: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      const { data } = await apiGetUser(identify);
      dispatch(actions.getOne(data.data.user));
      return data;
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const createUser = (payload: CreateUserTypes) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      const { data } = await apiCreateUser(payload);
      dispatch(actions.create(data.data.user));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const updateUser = (id: string, payload: UpdateUserTypes) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      const { data } = await apiUpdateUser(id, payload);
      dispatch(actions.update(data.data.user));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      const { data } = await apiDeleteUser(id);
      dispatch(actions.delete(data.data.user));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};
