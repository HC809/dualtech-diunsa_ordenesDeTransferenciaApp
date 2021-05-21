import "react-native-gesture-handler";
import React from "react";
import { useWindowDimensions } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Constants
import {
  LOGIN_SCREEN,
  INICIO_SCREEN,
  CONFIG_SCREEN,
  PRODUCTOS_SCREEN,
  CREATE_PRODUCTO_SCREEN,
  EDIT_PRODUCTO_SCREEN,
} from "../constants/screens";
//Screens
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ConfigScreen } from "../screens/ConfigScreen";
import { ProductosScreen } from "../screens/ProductosScreen";
import { CreateProductoScreen } from "../screens/CreateProductoScreen";
import { EditProductoScreen } from "../screens/EditProductoScreen";
//Drawer Content
import { DrawerContent } from "./DrawerContent";
//Models
import { IProducto } from "../models/IProducto";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export type ProductosStackParams = {
  ProductosScreen: undefined;
  CreateProductoScreen: undefined;
  EditProductoScreen: { producto: IProducto };
};

const ProductStack = createStackNavigator<ProductosStackParams>();

//#region STACK NAVIGATORS
const GeneralNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName={LOGIN_SCREEN}>
    <Stack.Screen
      name={LOGIN_SCREEN}
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const InicioNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName={INICIO_SCREEN}>
    <Stack.Screen
      name={INICIO_SCREEN}
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ConfigNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName={CONFIG_SCREEN}>
    <Stack.Screen
      name={CONFIG_SCREEN}
      component={ConfigScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProductosNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    initialRouteName={PRODUCTOS_SCREEN}
    mode="modal"
  >
    <ProductStack.Screen name={PRODUCTOS_SCREEN} component={ProductosScreen} />
    <ProductStack.Screen
      name={CREATE_PRODUCTO_SCREEN}
      component={CreateProductoScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
    <ProductStack.Screen
      name={EDIT_PRODUCTO_SCREEN}
      component={EditProductoScreen}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
  </Stack.Navigator>
);
//#endregion STACK NAVIGATORS

//#region DRAWER NAVIGATOR
const MyDrawerNavigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={width >= 768 ? "permanent" : "front"}
      screenOptions={{ gestureEnabled: true }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name={LOGIN_SCREEN} component={GeneralNavigator} />
      <Drawer.Screen name={INICIO_SCREEN} component={InicioNavigator} />
      <Drawer.Screen name={PRODUCTOS_SCREEN} component={ProductosNavigator} />
      <Drawer.Screen name={CONFIG_SCREEN} component={ConfigNavigator} />
    </Drawer.Navigator>
  );
};
//#endregion DRAWER NAVIGATOR

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MyDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
