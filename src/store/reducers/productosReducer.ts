import { IProducto } from "../../models/IProducto";
import {
  ProductosActionTypes,
  ADD_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
} from "../actions/productos/productosActionTypes";

const initialState: IProducto[] = [];

const themeReducer = (state = initialState, action: ProductosActionTypes) => {
  switch (action.type) {
    case ADD_PRODUCTO:
      return [...state, action.payload];

    case UPDATE_PRODUCTO:
      return state.map((prod) =>
        prod.id === action.payload.id ? action.payload : prod
      );

    case DELETE_PRODUCTO:
      return state.filter((p) => p.id !== action.payload);

    default:
      return state;
  }
};

export default themeReducer;
