import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  // DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  Avatar,
  IndexPath,
  Drawer,
  DrawerElement,
  DrawerItem,
  Layout,
  Text,
} from "@ui-kitten/components";
//Icons
import {
  ConfigIcon,
  HomeIcon,
  ProductosIcon,
} from "../components/shared/Icons";

export const DrawerContent = ({
  navigation,
  state,
}: DrawerContentComponentProps<DrawerContentOptions>): DrawerElement => {
  const renderHeader = () => (
    <Layout style={styles.drawerHeader} level="4">
      <View>
        <Avatar
          style={{ width: 150, height: 75 }}
          shape="square"
          size="giant"
          source={require("../../assets/diunsa_logo.png")}
        />
        <Text status={"primary"} style={styles.profileName} category="s1">
          Control Entradas y Salidas
        </Text>
      </View>
    </Layout>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer
        header={renderHeader}
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title="Inicio" accessoryLeft={HomeIcon} />
        <DrawerItem title="Entrada Producto" accessoryLeft={ProductosIcon} />
        <DrawerItem title="Configuración" accessoryLeft={ConfigIcon} />
      </Drawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    paddingHorizontal: 10,
    paddingTop: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
});
