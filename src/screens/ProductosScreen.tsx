import React from "react";
import { useSelector } from "react-redux";
import { View, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  List,
} from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { ProductoItem } from "../components/ProductoItem";
//Icons
import { AddIcon } from "../components/shared/Icons";
//Constants
import { CREATE_PRODUCTO_SCREEN } from "../constants/screens";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IProducto } from "../models/IProducto";
//Store
import { RootState } from "../store/store";

interface Props extends DrawerScreenProps<any, any> {}

export const ProductosScreen = ({ navigation }: Props) => {
  const productos: IProducto[] = useSelector(
    (state: RootState) => state.productos
  );

  const renderItem = (producto: ListRenderItemInfo<IProducto>) => {
    return <ProductoItem producto={producto.item} navigation={navigation} />;
  };

  const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

  const renderRightActions = () => (
    <TopNavigationAction
      icon={AddIcon}
      onPress={() => navigation.navigate(CREATE_PRODUCTO_SCREEN)}
    />
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Productos / Servicios" />}
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightActions}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flex}>
        <List
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item: IProducto) => item.id}
          style={styles.flex}
          contentContainerStyle={styles.paddingListItem}
          ListHeaderComponent={<></>}
          ListEmptyComponent={() => (
            <View style={styles.centerLayout}>
              <Text appearance="hint" category="s1">
                No hay productos agregados.
              </Text>
            </View>
          )}
        />
      </Layout>
    </SafeAreaView>
  );
};
