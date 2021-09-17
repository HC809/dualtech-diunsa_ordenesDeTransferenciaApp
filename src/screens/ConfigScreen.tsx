import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  Layout,
  TopNavigation,
  Divider,
  Toggle,
  Text,
  Modal,
} from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { SettingSection } from "../components/shared/SettingSection";
//Actions
import { changeTheme } from "../store/actions/config/configActions";
//Constants
import { THEME_DARK, THEME_LIGHT } from "../constants/shared";
//Store
import { RootState } from "../store/store";
//Styles
import { styles } from "../theme/appTheme";
//Actions
import { logout } from "../store/actions/auth/authActions";
//Api
import { ModalSeleccionarTienda } from '../components/ModalSeleccionarTienda';

interface Props extends DrawerScreenProps<any, any> { }

export const ConfigScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const themeMode: string = useSelector(
    (state: RootState) => state.config.themeMode
  );

  const [visibleModalIngresarTienda, setVisibleModalIngresarTienda] =
    useState<boolean>(false);

  const { name, storeName } = useSelector((state: RootState) => state.auth);

  const changeThemeMode = () => {
    dispatch(changeTheme(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
  };

  const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

  const modalSeleccionarTienda = () => {
    return (
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibleModalIngresarTienda(false)}
        visible={visibleModalIngresarTienda}
      >
        <ModalSeleccionarTienda
          setVisibleModal={setVisibleModalIngresarTienda}
        />
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Configuración" />}
        accessoryLeft={renderLeftAction}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flex}>
        <SettingSection hint="Usuario" onPress={() => { }}>
          <Text appearance="hint">{name || "No definido"}</Text>
        </SettingSection>

        <SettingSection hint="Tienda" onPress={() => setVisibleModalIngresarTienda(true)}>
          <Text appearance="hint">{storeName || "Seleccione"}</Text>
        </SettingSection>

        <SettingSection hint="Modo Oscuro" onPress={() => { }}>
          <Toggle
            checked={themeMode === THEME_DARK}
            onChange={changeThemeMode}
          />
        </SettingSection>
        <SettingSection
          hint="Cerrar Sesion"
          onPress={() => dispatch(logout())}
        />
      </Layout>
      {visibleModalIngresarTienda && modalSeleccionarTienda()}
    </SafeAreaView>
  );
};
