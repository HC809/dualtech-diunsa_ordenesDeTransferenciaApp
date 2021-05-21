import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppConnected from "./AppConnected";
import config from "./storeConfig";

const App = () => {
  return (
    <>
      <Provider store={config.store}>
        <PersistGate loading={null} persistor={config.persistor}>
          <AppConnected />
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;
