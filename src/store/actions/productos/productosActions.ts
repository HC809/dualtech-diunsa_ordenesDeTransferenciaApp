import { Dispatch } from "redux";
//Constants
import {
  ADD_PRODUCTO,
  DELETE_PRODUCTO,
  SET_PRODUCTOS,
} from "./productoActionsTypes";
//Models
import { IProducto } from "../../../models/IProducto";
//Actions
import { startSubmit, finishSubmit } from "../ui/loadingActions";
import { IApiResponse } from "../../../models/shared/IApiResponse";
import { fetchEntrada } from "../../../helpers/api";
import { Alert } from "react-native";

const setProductos = () => {
  return { type: SET_PRODUCTOS };
};

const addProducto = (producto: IProducto) => {
  return { type: ADD_PRODUCTO, payload: producto };
};

export const deleteProducto = (productoId: string) => {
  return { type: DELETE_PRODUCTO, payload: productoId };
};

export const startAddProducto = (producto: IProducto) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSubmit());

    try {
      await setTimeout(() => {
        dispatch(addProducto(producto));
        dispatch(finishSubmit(true));
      }, 1000);
    } catch (e) {
      dispatch(finishSubmit(false));
    }
  };
};

export const startSendProductos = (
  productos: IProducto[],
  numeroOT: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSubmit());

    try {
      const response: IApiResponse = await fetchEntrada.agregarListaProducto(
        productos,
        numeroOT
      );
      if (response.ok) {
        dispatch(setProductos());
        dispatch(finishSubmit(true));
      } else {
        Alert.alert("Error", response.errorMsg, [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (e) {
      dispatch(finishSubmit(false));
      Alert.alert("API Error", "Request failed with status code 404", [
        {
          text: "Ok",
        },
      ]);
    }
  };
};
