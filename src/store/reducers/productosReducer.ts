import {
  ProductosActionTypes,
  ADD_PRODUCTO,
  DELETE_PRODUCTO,
  SET_PRODUCTOS,
} from "../actions/productos/productoActionsTypes";
import { IProducto } from "../../models/IProducto";

const initialState: IProducto[] = [];

const productosReducer = (
  state = initialState,
  action: ProductosActionTypes
) => {
  switch (action.type) {
    case ADD_PRODUCTO:
      return [action.payload, ...state];

    case DELETE_PRODUCTO:
      return state.filter((p) => p.id !== action.payload);

    case SET_PRODUCTOS:
      return [];

    default:
      return state;
  }
};

export default productosReducer;
