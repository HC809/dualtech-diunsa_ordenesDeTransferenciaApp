import React from "react";
import { useDispatch } from "react-redux";
import { Text, Card, Button } from "@ui-kitten/components";
import { View } from "react-native";
//Models
import { IProducto } from "../models/IProducto";
//Theme
import { styles } from "../theme/appTheme";
//IconsF
import { TrashsIcon } from "./shared/Icons";
//Actions
import { deleteProducto } from "../store/actions/productos/productosActions";

interface IProps {
  producto: IProducto;
}

export const ProductoEntradaListItem = React.memo(
  ({ producto }: IProps): React.ReactElement => {
    const dispatch = useDispatch();

    return (
      <Card
        style={{ marginVertical: 5, borderColor: "#BEBEBE" }}
        onPress={() => {}}
        footer={() => (
          <View style={{ marginVertical: 8, marginHorizontal: 25 }}>
            <Text appearance="hint" category="s1">
              {producto.Barcode}
            </Text>
            <Text
              appearance="hint"
              category="s1"
            >{`Cantidad: ${producto.Quantity}`}</Text>
          </View>
        )}
      >
        <View style={styles.headerItemRowView}>
          <Text category="s1">{producto.Name}</Text>
          <Button
            style={styles.removeListItemButton}
            appearance="ghost"
            status="basic"
            accessoryLeft={TrashsIcon}
            onPress={() => dispatch(deleteProducto(producto.id))}
          />
        </View>
      </Card>
    );
  }
);
