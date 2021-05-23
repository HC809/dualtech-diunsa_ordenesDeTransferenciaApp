import { Dispatch } from "redux";
//Api
import { fetchAuth } from "../../../helpers/api";
//Models
import { IApiResponse } from "../../../models/shared/IApiResponse";
import { ILogin } from "../../../models/ILogin";
//UI actions
import { startSubmit, finishSubmit } from "../ui/loadingActions";
//Action-Types
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

export const startLogin = (model: ILogin) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSubmit());

    try {
      const response: IApiResponse = await fetchAuth.login(model);
      console.log(response);
      if (response.ok) {
        const { token, uid, name } = response.data;
        dispatch(login(token, name));
        dispatch(finishSubmit(true));
      }
    } catch (e) {
      dispatch(finishSubmit(false));
      return alert(e.response.data.errorMsg);
    }
  };
};
