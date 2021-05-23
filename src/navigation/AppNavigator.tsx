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
  ENTRADAS_SCREEN,
} from "../constants/screens";
//Screens
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ConfigScreen } from "../screens/ConfigScreen";
import { EntradaScreen } from "../screens/EntradaScreen";
//Drawer Content
import { DrawerContent } from "./DrawerContent";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IAuth } from "../models/IAuth";
import { AUTH } from "../constants/shared";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const HomeNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName={LOGIN_SCREEN}>
    <Stack.Screen
      name={INICIO_SCREEN}
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const EntradaNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName={ENTRADAS_SCREEN}>
    <Stack.Screen
      name={ENTRADAS_SCREEN}
      component={EntradaScreen}
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
      <Drawer.Screen name={INICIO_SCREEN} component={HomeNavigator} />
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
