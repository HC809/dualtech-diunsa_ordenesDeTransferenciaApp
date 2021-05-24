import { Dispatch } from "redux";
//Constants
import { ADD_PRODUCTO, DELETE_PRODUCTO } from "./productoActionsTypes";
//Models
import { IProducto } from "../../../models/IProducto";
//Actions
import { startSubmit, finishSubmit } from "../ui/loadingActions";

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
