import { IAuth } from "../../models/IAuth";
import { AUTH, NOTAUTH } from "../../constants/shared";
import {
  AuthActionTypes,
  LOGIN,
  REMOVE_ERROR,
  SET_ERROR_MSG,
  NOT_AUTH,
  LOGOUT,
} from "../actions/auth/authActionTypes";

const initialState: IAuth = {
  status: NOT_AUTH,
  errorMessage: "",
  user: null,
  token: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): IAuth => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        status: AUTH,
        token: action.payload.token,
        user: action.payload.user,
        errorMessage: "",
      };

    case SET_ERROR_MSG:
      return {
        ...state,
        errorMessage: action.payload,
        token: null,
        user: null,
      };

    case REMOVE_ERROR:
      return {
        ...state,
        errorMessage: "",
      };

    case LOGOUT:
    case NOT_AUTH:
      return {
        ...state,
        status: NOTAUTH,
        token: null,
        user: null,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default authReducer;
