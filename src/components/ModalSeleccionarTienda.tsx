import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Input, Button, Divider, Select, IndexPath, SelectItem } from "@ui-kitten/components";
import { Alert, View } from "react-native";
//Styles
import { styles } from "../theme/appTheme";
import { fetchAuth, fetchEntrada } from "../helpers/api";
import { IApiResponse } from "../models/shared/IApiResponse";
import { LoadingButton } from "./shared/LoadingButton";
import { ISelectOption } from '../models/shared/ISelectOption';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { IStoreModel } from '../models/IStoreModel';
import { setStore } from '../store/actions/auth/authActions';

export interface IModalProps {
    setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalSeleccionarTienda = ({
    setVisibleModal,
}: IModalProps) => {
    const dispatch = useDispatch();
    const { storeId } = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState<boolean>(false);
    const [stores, setStores] = useState<ISelectOption[]>([]);
    const [storeSeleected, setStoreSelected] = useState<ISelectOption>();

    useEffect(() => {

        const getTiendas = async () => {
            try {
                setLoading(true);
                const response: IStoreModel[] = await fetchAuth.getStores();
                response.forEach(element => {
                    let store: ISelectOption = {
                        id: element.id,
                        text: element.description
                    }
                    setStores(stores => [...stores, store]);
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setVisibleModal(false);
                Alert.alert(
                    "API Error",
                    "Request failed with status code 404",
                    [
                        {
                            text: "Ok",
                        },
                    ]
                );
            }
        }

        getTiendas();

    }, []);

    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
        new IndexPath(
            storeId === null
                ? 0
                : stores.findIndex(
                    (c) => c.id === storeId
                )
        )
    );

    return (
        <ScrollView>
            <Layout level="2" style={styles.modalContainer}>
                <Text
                    style={{ marginHorizontal: 10, textAlign: "center" }}
                    category="h6"
                >
                    Seleccione una tienda
                </Text>
                <Divider style={styles.dividerColor} />
                {loading ? (
                    <Text style={{ marginTop: 30, }}>Cargando tiendas..</Text>
                ) : (
                    <Select
                        style={{ marginTop: 30 }}
                        placeholder="Intervalo Horas"
                        value={stores[selectedIndex.row]?.text || "Seleccione"}
                        selectedIndex={selectedIndex}
                        onSelect={(index: IndexPath | IndexPath[]) => {
                            let indexValue: IndexPath = index as IndexPath;
                            setSelectedIndex(indexValue);
                            let str: ISelectOption = {
                                id: stores[indexValue.row].id,
                                text: stores[indexValue.row].text
                            }
                            setStoreSelected(str);
                        }}
                    >
                        {stores.map((t: ISelectOption) => (
                            <SelectItem key={t.id} title={t.text} />
                        ))}
                    </Select>
                )}

                <View style={styles.buttonRowContainer}>
                    <Button
                        style={styles.modalButton}
                        onPress={() => setVisibleModal(false)}
                        disabled={loading}
                        status="basic"
                        appearance="outline"
                        size="medium"
                    >
                        Cancelar
                    </Button>
                    <Button
                        style={styles.modalButton}
                        onPress={() => {
                            if (storeSeleected !== undefined) {
                                dispatch(setStore(storeSeleected));
                                setVisibleModal(false);
                            }
                            else {
                                Alert.alert("Error", "Seleccione una tienda.");
                            }
                        }}
                        disabled={loading}
                        size="medium"
                    >
                        Seleccionar
                    </Button>
                </View>
            </Layout>
        </ScrollView>
    );
};
