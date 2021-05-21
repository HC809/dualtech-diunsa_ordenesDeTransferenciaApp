import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Layout,
  TopNavigation,
  Divider,
  TopNavigationAction,
} from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { BackAction } from "../components/navigation/BackActions";
import { ProductoForm } from "../components/ProductoForm";
import { DeleteModal } from "../components/shared/DeleteModal";
import { DeleteIcon } from "../components/shared/Icons";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IProductoForm, IProducto } from "../models/IProducto";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
//Actions
import {
  startDeleteProducto,
  startUpdateProducto,
} from "../store/actions/productos/productosActions";
import { finishDelete, finishSubmit } from "../store/actions/ui/loadingActions";
//Store
import { RootState } from "../store/store";
//Constants
import { PRIMARY_COLOR_600 } from "../constants/shared";
//Stack Product Params
import { ProductosStackParams } from "../navigation/AppNavigator";

interface Props
  extends StackScreenProps<ProductosStackParams, "EditProductoScreen"> {}

export const EditProductoScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const { producto } = route.params;

  const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.submitLoading
  );

  const {
    loading: deleteLoading,
    wasSuccessfull: successfullDelete,
  }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.deleteLoading
  );

  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  const initialValues: IProductoForm = {
    descripcion: producto.descripcion,
    precio: producto.precio,
    existencia: producto.existencia,
    activo: producto.activo,
    tieneInventario: producto.tieneInventario,
    sincronizado: producto.sincronizado,
  };

  //Submit (Edit)
  useEffect(() => {
    if (wasSuccessfull) {
      dispatch(finishSubmit(false));

      showMessage({
        message: "Producto actualizado correctamente!",
        type: "success",
        animated: true,
        floating: true,
        icon: "success",
        backgroundColor: PRIMARY_COLOR_600,
      });
      navigation.goBack();
    }
  }, [wasSuccessfull, navigation, dispatch]);

  //Delete
  useEffect(() => {
    if (successfullDelete) {
      dispatch(finishDelete(false));

      showMessage({
        message: "Producto eliminado correctamente!",
        type: "success",
        animated: true,
        floating: true,
        icon: "success",
        backgroundColor: PRIMARY_COLOR_600,
      });
      navigation.goBack();
    }
  }, [successfullDelete, navigation, dispatch]);

  const handleUpdateProducto = useCallback(
    (model: IProductoForm) => {
      const productoModel: IProducto = { id: producto.id, ...model };
      dispatch(startUpdateProducto(productoModel));
    },
    [dispatch]
  );

  const handleDeleteProducto = useCallback(() => {
    setVisibleDeleteModal(false);
    dispatch(startDeleteProducto(producto.id));
  }, [dispatch]);

  const renderLeftAction = () => (
    <BackAction navigation={navigation} disabled={loading || deleteLoading} />
  );

  const renderRightActions = () => (
    <TopNavigationAction
      icon={DeleteIcon}
      onPress={() => setVisibleDeleteModal(true)}
      disabled={loading || deleteLoading}
    />
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Editar Producto/Servicio" />}
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightActions}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flexLayout}>
        <ProductoForm
          initialValues={initialValues}
          loading={loading}
          deleteLoading={deleteLoading}
          handleSubmit={handleUpdateProducto}
          newItem={false}
          productoId={producto.id}
        />
      </Layout>
      {visibleDeleteModal && (
        <DeleteModal
          handleDelete={handleDeleteProducto}
          visibleModal={visibleDeleteModal}
          setVisibleModal={setVisibleDeleteModal}
          title="Eliminar Producto"
          text={`Seguro que desea eliminar el producto `}
          itemName={producto.descripcion}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
};
