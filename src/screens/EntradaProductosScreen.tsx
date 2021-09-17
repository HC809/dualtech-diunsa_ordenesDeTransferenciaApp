import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { View, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Layout,
  Text,
  TopNavigation,
  Divider,
  List,
  Button,
} from "@ui-kitten/components";
import { showMessage } from "react-native-flash-message";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ProductoEntradaListItem } from "../components/ProductoEntradaListItem";
import { SearchBar } from "../components/shared/SearchBar";
//Styles
import { styles } from "../theme/appTheme";
//Models
import { IProducto } from "../models/IProducto";
//Store
import { RootState } from "../store/store";
import { SendIcon } from "../components/shared/Icons";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
import { finishSubmit } from "../store/actions/ui/loadingActions";
import { PRIMARY_COLOR_600 } from "../constants/shared";
import { LoadingButton } from "../components/shared/LoadingButton";
import { startSendProductos } from "../store/actions/productos/productosActions";

export const EntradaProductosScreen = () => {
  const dispatch = useDispatch();

  const productosEntrada: IProducto[] = useSelector(
    (state: RootState) => state.productosEntrada
  );

  const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.submitLoading
  );

  const totalItems = (): number => {
    let total: number = 0;
    productosEntrada.map((c) => {
      total += c.Quantity;
    });

    return total;
  };

  useEffect(() => {
    if (wasSuccessfull) {
      dispatch(finishSubmit(false));
      showMessage({
        message: "Productos enviados correctamente!",
        type: "success",
        animated: true,
        floating: true,
        icon: "success",
        backgroundColor: PRIMARY_COLOR_600,
      });
    }
  }, [wasSuccessfull, dispatch]);

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
          ListHeaderComponent={
            <View style={{ padding: 10 }}>
              {loading ? (
                <LoadingButton text={"Enviando"} status={"primary"} />
              ) : (
                <View>
                  <Text
                    status="primary"
                    style={{ textAlign: "center", paddingBottom: 5 }}
                  >{`Total productos: ${productosEntrada.length}`}</Text>
                  <Text
                    status="primary"
                    style={{ textAlign: "center", paddingBottom: 5 }}
                  >{`Total items: ${totalItems()}`}</Text>
                  <Button
                    accessoryLeft={SendIcon}
                    onPress={async () => {
                      const numeroOT = await AsyncStorage.getItem("numeroOT");
                      dispatch(startSendProductos(productosEntrada, numeroOT!));
                    }}
                    status="primary"
                    disabled={loading || productosEntradaList.length === 0}
                  >
                    Finalizar Recibo
                  </Button>
                </View>
              )}
            </View>
          }
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
