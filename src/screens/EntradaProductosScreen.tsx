import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Layout,
  Text,
  TopNavigation,
  Divider,
  TopNavigationAction,
  List,
} from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ProductoEntradaListItem } from "../components/ProductoEntradaListItem";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { SearchBar } from "../components/shared/SearchBar";
//Styles
import { styles } from "../theme/appTheme";
//Icons
import { UserIcon } from "../components/shared/Icons";
//Models
import { IProducto } from "../models/IProducto";
//Store
import { RootState } from "../store/store";

interface Props extends StackScreenProps<any, any> {}

export const EntradaProductosScreen = ({ navigation }: Props) => {
  const productosEntrada: IProducto[] = useSelector(
    (state: RootState) => state.productosEntrada
  );

  const [searchTextProducto, setSearchTextProducto] = useState<string>("");
  const [productosEntradaList, setProductosEntradaList] =
    useState<IProducto[]>(productosEntrada);

  useEffect(() => {
    setProductosEntradaList(productosEntrada);
  }, [productosEntrada]);

  const searchFilterFunction = useCallback(
    (text: string): void => {
      setSearchTextProducto(text);
      let newData: IProducto[] = productosEntrada.filter((item) => {
        let itemData = item.Name.toUpperCase();
        let textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setProductosEntradaList(newData);
    },
    [setSearchTextProducto, setProductosEntradaList, productosEntrada]
  );

  const renderItem = (cliente: ListRenderItemInfo<IProducto>) => {
    return <ProductoEntradaListItem producto={cliente.item} />;
  };

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation title={() => <ScreenTitle title="Lista Productos" />} />
      <Divider style={styles.dividerColor} />
      <Layout level="2" style={styles.flex}>
        <SearchBar
          searchFilterFunction={searchFilterFunction}
          searchText={searchTextProducto}
        />
        <List
          data={productosEntradaList}
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
