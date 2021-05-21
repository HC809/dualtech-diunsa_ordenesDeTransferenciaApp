import { Dispatch } from "redux";
//Constants
import {
  ADD_PRODUCTO,
  DELETE_PRODUCTO,
  UPDATE_PRODUCTO,
} from "./productosActionTypes";
//Models
import { IProducto } from "../../../models/IProducto";
//Actions
import {
  startSubmit,
  finishSubmit,
  startDelete,
  finishDelete,
} from "../ui/loadingActions";

const addProducto = (producto: IProducto) => {
  return { type: ADD_PRODUCTO, payload: producto };
};

const updateProducto = (producto: IProducto) => {
  return { type: UPDATE_PRODUCTO, payload: producto };
};

const deleteProducto = (productoId: string) => {
  return { type: DELETE_PRODUCTO, payload: productoId };
};

export const startCreateProducto = (producto: IProducto) => {
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

export const startUpdateProducto = (producto: IProducto) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSubmit());

    try {
      await setTimeout(() => {
        dispatch(updateProducto(producto));
        dispatch(finishSubmit(true));
      }, 1000);
    } catch (e) {
      dispatch(finishSubmit(false));
    }
  };
};

export const startDeleteProducto = (productoId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(startDelete());

    try {
      await setTimeout(() => {
        dispatch(deleteProducto(productoId));
        dispatch(finishDelete(true));
      }, 1000);
    } catch (e) {
      dispatch(finishDelete(false));
      alert("Error al eliminar el producto.");
    }
  };
};
