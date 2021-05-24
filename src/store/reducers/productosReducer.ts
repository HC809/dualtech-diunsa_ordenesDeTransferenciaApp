import {
  ProductosActionTypes,
  ADD_PRODUCTO,
  DELETE_PRODUCTO,
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

    default:
      return state;
  }
};

export default productosReducer;
