import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, TopNavigation, Divider, Button } from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { EntradaForm } from "../components/EntradaForm";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IEntrada } from "../models/IEntrada";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
//Actions
import { finishSubmit } from "../store/actions/ui/loadingActions";
//Store
import { RootState } from "../store/store";
//Constants
import { PRIMARY_COLOR_600 } from "../constants/shared";

interface Props extends DrawerScreenProps<any, any> {}

//#region INITIAL VALUES
const initialValues: IEntrada = {
  numeroOT: "",
  codigoBarra: "",
  cantidad: 0,
};
//#endregion INITIAL VALUES

export const EntradaScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.submitLoading
  );

  const [visibleModalIngresarNumeroOT, setVisibleModalIngresarNumeroOT] =
    useState<boolean>(false);

  useEffect(() => {
    if (wasSuccessfull) {
      dispatch(finishSubmit(false));
      showMessage({
        message: "Agregado correctamente!",
        type: "success",
        animated: true,
        floating: true,
        icon: "success",
        backgroundColor: PRIMARY_COLOR_600,
      });
      navigation.goBack();
    }
  }, [wasSuccessfull, navigation, dispatch]);

  const handleEnviarEntrada = useCallback(
    (model: IEntrada) => {
      //dispatch(startCreateProducto(model));
    },
    [dispatch]
  );

  const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

  const renderRightActions = () => (
    <Button
      size="small"
      appearance="outline"
      onPress={() => setVisibleModalIngresarNumeroOT(true)}
    >
      Ingrese Número OT
    </Button>
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Entrada Producto" />}
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightActions}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flex}>
        <EntradaForm
          initialValues={initialValues}
          loading={loading}
          handleFormikSubmit={handleEnviarEntrada}
          visibleModalOT={visibleModalIngresarNumeroOT}
          setVisibleModalOT={setVisibleModalIngresarNumeroOT}
        />
      </Layout>
    </SafeAreaView>
  );
};
