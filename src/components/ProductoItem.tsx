import React from "react";
import { useSelector } from "react-redux";
import { Text, Card, Divider } from "@ui-kitten/components";
import { View } from "react-native";
//Models
import { IProducto } from "../models/IProducto";
//Theme
import { styles } from "../theme/appTheme";
//Constants
import {
  PRIMARY_COLOR_700,
  PRIMARY_COLOR_400,
  DANGER_COLOR_600,
  DANGER_COLOR_500,
  THEME_LIGHT,
} from "../constants/shared";
import { EDIT_PRODUCTO_SCREEN } from "../constants/screens";
//Store
import { RootState } from "../store/store";
//Components
import { ActivoIcon, InactivoIcon } from "./shared/Icons";

interface IProps {
  navigation: any;
  producto: IProducto;
}

export const ProductoItem = React.memo(
  ({ producto, navigation }: IProps): React.ReactElement => {
    const themeMode: string = useSelector(
      (state: RootState) => state.config.themeMode
    );

    const Footer = () => {
      return (
        <View
          style={[
            styles.headerItemRowView,
            { marginVertical: 8, marginHorizontal: 25 },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            {producto.activo ? <ActivoIcon /> : <InactivoIcon />}
            <Text category="s2" appearance="hint" style={{ paddingLeft: 5 }}>
              {producto.activo ? "Activo" : "Inactivo"}
            </Text>
          </View>
          {producto.tieneInventario && (
            <View style={{ flexDirection: "row" }}>
              <Text category="s2" appearance="hint" style={{ paddingRight: 5 }}>
                Stock
              </Text>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor:
                    producto.existencia > 0
                      ? themeMode === THEME_LIGHT
                        ? PRIMARY_COLOR_700
                        : PRIMARY_COLOR_400
                      : themeMode === THEME_LIGHT
                      ? DANGER_COLOR_600
                      : DANGER_COLOR_500,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    flexWrap: "wrap",
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                  }}
                  category="s2"
                  appearance="alternative"
                >
                  {producto.existencia}
                </Text>
              </View>
            </View>
          )}
        </View>
      );
    };

    return (
      <Card
        style={{ marginVertical: 5 }}
        onPress={() => {
          navigation.navigate(EDIT_PRODUCTO_SCREEN, { producto });
        }}
        footer={Footer}
      >
        <View style={styles.headerItemRowView}>
          <Text
            category="s1"
            appearance={!producto.activo ? "hint" : "default"}
          >{`${producto.descripcion}`}</Text>
          <Text
            category="p1"
            appearance={!producto.activo ? "hint" : "default"}
          >{`L. ${producto.precio}`}</Text>
        </View>
      </Card>
    );
  }
);
