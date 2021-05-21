import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { Layout, TopNavigation, Divider } from "@ui-kitten/components";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { BackAction } from "../components/navigation/BackActions";
import { ProductoForm } from "../components/ProductoForm";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IProductoForm, IProducto } from "../models/IProducto";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
//Actions
import { startCreateProducto } from "../store/actions/productos/productosActions";
import { finishSubmit } from "../store/actions/ui/loadingActions";
//Store
import { RootState } from "../store/store";
//Constants
import { PRIMARY_COLOR_600 } from "../constants/shared";

interface Props extends StackScreenProps<any, any> {}

//#region INITIAL VALUES
const initialValues: IProductoForm = {
  descripcion: "",
  precio: 0,
  existencia: 0,
  activo: true,
  tieneInventario: false,
  sincronizado: false,
};
//#endregion INITIAL VALUES

export const CreateProductoScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.submitLoading
  );

  useEffect(() => {
    if (wasSuccessfull) {
      dispatch(finishSubmit(false));
      showMessage({
        message: "Producto agregado correctamente!",
        type: "success",
        animated: true,
        floating: true,
        icon: "success",
        backgroundColor: PRIMARY_COLOR_600,
      });
      navigation.goBack();
    }
  }, [wasSuccessfull, navigation, dispatch]);

  const handleCreateProducto = useCallback(
    (model: IProductoForm) => {
      const productoModel: IProducto = { id: uuidv4(), ...model };
      dispatch(startCreateProducto(productoModel));
    },
    [dispatch]
  );

  const renderLeftAction = () => (
    <BackAction navigation={navigation} disabled={loading} />
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Agregar Producto/Servicio" />}
        accessoryLeft={renderLeftAction}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flexLayout}>
        <ProductoForm
          initialValues={initialValues}
          loading={loading}
          deleteLoading={false}
          handleSubmit={handleCreateProducto}
          newItem={true}
        />
      </Layout>
    </SafeAreaView>
  );
};
