import { combineReducers } from "redux";
//import { RESET_STORE } from "../constants/shared";
//Reducers
import configReducer from "./reducers/configReducer";
import productosReducer from "./reducers/productosReducer";
import uiReducer from "./reducers/uiReducer";

const Reducers = combineReducers({
  config: configReducer,
  productos: productosReducer,
  ui: uiReducer,
});

// const rootReducer = (state, action) => {
//   if (action.type === RESET_STORE) state = undefined;

//   return Reducers(state, action);
// };

export default Reducers;

export type RootState = ReturnType<typeof Reducers>;
