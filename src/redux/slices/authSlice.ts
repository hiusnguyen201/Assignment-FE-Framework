import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  register as apiRegister,
  LoginTypes,
  RegisterTypes,
} from "#src/api";
import { setSession, isValidToken } from "#src/utils/jwtUtils";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    login(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    register(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    logout(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = false;
    },
    initialize(state, action) {
      const { isAuthenticated, user, isInitialized } = action.payload;
      state.isLoading = false;
      state.user = user;
      state.error = null;
      state.isAuthenticated = isAuthenticated;
      state.isInitialized = isInitialized;
    },
    clear(state) {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isInitialized = false;
    },
  },
});

const { actions, reducer } = authSlice;
export default reducer;

export const login = (payload: LoginTypes) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.clear());
      dispatch(actions.startLoading());
      const { data } = await apiLogin(payload);
      const { accessToken, refreshToken, user } = data.data;
      setSession(accessToken, refreshToken);
      dispatch(actions.login(user));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const register = (payload: RegisterTypes) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.clear());
      dispatch(actions.startLoading());
      const { data } = await apiRegister(payload);
      const { accessToken, user } = data.data;
      setSession(accessToken);
      dispatch(actions.login(user));
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());
      setSession(null);
      dispatch(actions.logout());
    } catch (e: any) {
      dispatch(actions.hasError(e));
    }
  };
};
