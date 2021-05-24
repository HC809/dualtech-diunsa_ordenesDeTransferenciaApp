import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, TopNavigation, Divider, Button } from "@ui-kitten/components";

//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { EntradaForm } from "../components/EntradaForm";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IEntrada } from "../models/IEntrada";

interface Props extends DrawerScreenProps<any, any> {}

//#region INITIAL VALUES
const initialValues: IEntrada = {
  numeroOT: "",
  codigoBarra: "",
  cantidad: 0,
};
//#endregion INITIAL VALUES

export const EntradaScreen = ({ navigation }: Props) => {
  const [visibleModalIngresarNumeroOT, setVisibleModalIngresarNumeroOT] =
    useState<boolean>(false);

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
          visibleModalOT={visibleModalIngresarNumeroOT}
          setVisibleModalOT={setVisibleModalIngresarNumeroOT}
        />
      </Layout>
    </SafeAreaView>
  );
};
