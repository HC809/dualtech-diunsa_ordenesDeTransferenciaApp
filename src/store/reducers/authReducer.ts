import { IAuth } from "../../models/IAuth";
import { AUTH, NOTAUTH } from "../../constants/shared";
import {
  AuthActionTypes,
  LOGIN,
  REMOVE_ERROR,
  SET_ERROR_MSG,
  NOT_AUTH,
  LOGOUT,
  SET_STORE
} from "../actions/auth/authActionTypes";

const initialState: IAuth = {
  status: NOT_AUTH,
  errorMessage: "",
  username: null,
  name: null,
  token: null,
  storeId: null,
  storeName: null
};

const authReducer = (state = initialState, action: AuthActionTypes): IAuth => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        status: AUTH,
        token: action.payload.token,
        username: action.payload.username,
        name: action.payload.name,
        errorMessage: "",
      };

    case SET_ERROR_MSG:
      return {
        ...state,
        errorMessage: action.payload,
        token: null,
        username: null,
        name: null,
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
        username: null,
        name: null,
        errorMessage: "",
        storeId: null,
        storeName: null
      };

      case SET_STORE:
        return {
          ...state,
          storeId: action.payload.id,
          storeName: action.payload.text,
        };

    default:
      return state;
  }
};

export default authReducer;
