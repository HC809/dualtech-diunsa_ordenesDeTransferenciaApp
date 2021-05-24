import { IProducto } from "../../../models/IProducto";

export const ADD_PRODUCTO = "ADD_PRODUCTO";
export const DELETE_PRODUCTO = "DELETE_PRODUCTO";

type AddProductoAction = {
  type: typeof ADD_PRODUCTO;
  payload: IProducto;
};

type DeleteProductoAction = {
  type: typeof DELETE_PRODUCTO;
  payload: string;
};

export type ProductosActionTypes = AddProductoAction | DeleteProductoAction;
