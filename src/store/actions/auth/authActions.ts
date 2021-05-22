import {
  LOGIN,
  REMOVE_ERROR,
  SET_ERROR_MSG,
  NOT_AUTH,
  LOGOUT,
} from "./authActionTypes";

const login = (token: string, user: string) => {
  return { type: LOGIN, payload: { token, user } };
};

export const setErrorMsg = (msg: string) => {
  return { type: SET_ERROR_MSG, payload: msg };
};

export const removeErrorMsg = () => {
  return { type: REMOVE_ERROR };
};

export const notAuth = () => {
  return { type: NOT_AUTH };
};

export const logout = () => {
  return { type: LOGOUT };
};
