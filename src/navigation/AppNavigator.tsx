import "react-native-gesture-handler";
import React from "react";
import { useSelector } from "react-redux";
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
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
//Constants
import {
  LOGIN_SCREEN,
  INICIO_SCREEN,
  CONFIG_SCREEN,
  ENTRADAS_SCREEN,
  ENTRADAS_PRODUCTOS_SCREEN,
} from "../constants/screens";
import { AUTH } from "../constants/shared";
//Screens
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ConfigScreen } from "../screens/ConfigScreen";
import { EntradaScreen } from "../screens/EntradaScreen";
import { EntradaProductosScreen } from "../screens/EntradaProductosScreen";
//Drawer Content
import { DrawerContent } from "./DrawerContent";
//Store
import { RootState } from "../store/store";
//Models
import { IAuth } from "../models/IAuth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const EntradaBottomTabBar = (props: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    selectedIndex={props.state.index}
    onSelect={(index) =>
      props.navigation.navigate(props.state.routeNames[index])
    }
  >
    <BottomNavigationTab
      title="Agregar Producto"
      icon={(p) => <Icon {...p} name="plus-circle-outline" />}
    />
    <BottomNavigationTab
      title="Lista Productos"
      icon={(p) => <Icon {...p} name="list-outline" />}
    />
  </BottomNavigation>
);

//#region STACK NAVIGATORS
const AuthNavigator = () => (
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

// const HomeNavigator = () => (
//   <Stack.Navigator headerMode="none" initialRouteName={LOGIN_SCREEN}>
//     <Stack.Screen
//       name={INICIO_SCREEN}
//       component={HomeScreen}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

const EntradaNavigator = () => (
  <Tab.Navigator tabBar={(props) => <EntradaBottomTabBar {...props} />}>
    <Tab.Screen name={ENTRADAS_SCREEN} component={EntradaScreen} />
    <Tab.Screen
      name={ENTRADAS_PRODUCTOS_SCREEN}
      component={EntradaProductosScreen}
    />
  </Tab.Navigator>
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
      {/* <Drawer.Screen name={INICIO_SCREEN} component={HomeNavigator} /> */}
      <Drawer.Screen name={ENTRADAS_SCREEN} component={EntradaNavigator} />
      <Drawer.Screen name={CONFIG_SCREEN} component={ConfigNavigator} />
    </Drawer.Navigator>
  );
};
//#endregion DRAWER NAVIGATOR

const AppNavigator = () => {
  const { status: authStatus }: IAuth = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <NavigationContainer>
      {authStatus === AUTH ? <MyDrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
