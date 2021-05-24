import { IProducto } from "../../../models/IProducto";

export const ADD_PRODUCTO = "ADD_PRODUCTO";
export const DELETE_PRODUCTO = "DELETE_PRODUCTO";
export const SET_PRODUCTOS = "SET_PRODUCTOS";

type AddProductoAction = {
  type: typeof ADD_PRODUCTO;
  payload: IProducto;
};

type DeleteProductoAction = {
  type: typeof DELETE_PRODUCTO;
  payload: string;
};

type SetProductosAction = {
  type: typeof SET_PRODUCTOS;
};

export type ProductosActionTypes =
  | AddProductoAction
  | DeleteProductoAction
  | SetProductosAction;
