import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, TopNavigation, Divider, Button } from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { SalidaForm } from '../components/SalidaForm';
//Styles
import { styles } from "../theme/appTheme";
//Models
import { ISalida } from '../models/ISalida';

interface Props extends DrawerScreenProps<any, any> { }

//#region INITIAL VALUES
const initialValues: ISalida = {
    codigoBarra: "",
    cantidad: 0,
};
//#endregion INITIAL VALUES

export const SalidaScreen = ({ navigation }: Props) => {
    const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

    return (
        <SafeAreaView style={styles.flex}>
            <TopNavigation
                title={() => <ScreenTitle title="Salida de Productos" />}
                accessoryLeft={renderLeftAction}
            />
            <Divider style={styles.dividerColor} />
            <Layout style={styles.flex}>
                <SalidaForm
                    initialValues={initialValues}
                />
            </Layout>
        </SafeAreaView>
    );
};
