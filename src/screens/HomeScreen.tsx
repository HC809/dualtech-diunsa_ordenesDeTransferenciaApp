import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, Text, TopNavigation, Divider } from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
//Styles
import { styles } from "../theme/appTheme";

interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({ navigation }: Props) => {
  const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Mi Negocio" />}
        accessoryLeft={renderLeftAction}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.centerLayout}>
        <Text category="h1">Inicio</Text>
      </Layout>
    </SafeAreaView>
  );
};
