import React, { Dispatch, SetStateAction, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Input, Button, Divider } from "@ui-kitten/components";
import { Alert, View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
//Styles
import { styles } from "../theme/appTheme";
import { fetchEntrada } from "../helpers/api";
import { IApiResponse } from "../models/shared/IApiResponse";
import { LoadingButton } from "./shared/LoadingButton";

export interface IIngresarOTForm {
  numeroOT: string;
}

const ingresarOTValidationSchema: Yup.SchemaOf<IIngresarOTForm> = Yup.object({
  numeroOT: Yup.string()
    .required("Ingrese el número OT.")
    .min(10, "El número debe contener 10 caracteres.")
    .max(10, "El número debe contener 10 caracteres."),
});

const initialValues: IIngresarOTForm = {
  numeroOT: "",
};

export interface IModalProps {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  setFormikFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  numeroOTConstant: string;
}

export const ModalIngresarNumeroOT = ({
  setVisibleModal,
  setFormikFieldValue,
  numeroOTConstant,
}: IModalProps) => {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ScrollView>
      <Layout level="2" style={styles.modalContainer}>
        <Text
          style={{ marginHorizontal: 10, textAlign: "center" }}
          category="h6"
        >
          Ingrese Número OT
        </Text>
        <Divider style={styles.dividerColor} />
        <Formik
          validationSchema={ingresarOTValidationSchema}
          initialValues={initialValues}
          onSubmit={async (model: IIngresarOTForm) => {
            try {
              setLoading(true);
              const response: IApiResponse = await fetchEntrada.validarOT(
                model.numeroOT
              );
              setLoading(false);
              if (response.ok) {
                await AsyncStorage.setItem("numeroOT", model.numeroOT);
                setVisibleModal(false);
                setFormikFieldValue(numeroOTConstant, model.numeroOT);
              } else {
                Alert.alert("No Válido", response.errorMsg, [
                  {
                    text: "Ok",
                  },
                ]);
              }
            } catch (error) {
              Alert.alert("API Error", "Request failed with status code 404", [
                {
                  text: "Ok",
                },
              ]);
            }
          }}
        >
          {(props: FormikProps<IIngresarOTForm>) => {
            const {
              values,
              errors,
              handleSubmit,
              handleChange,
              handleBlur,
              isValid,
            } = props;
            return (
              <View style={{ marginTop: 20 }}>
                <Input
                  style={styles.formikInput}
                  placeholder="Número OT"
                  value={values.numeroOT}
                  autoCapitalize={"characters"}
                  onChangeText={handleChange(numeroOTConstant)}
                  onBlur={handleBlur(numeroOTConstant)}
                  returnKeyType="done"
                />
                {errors.numeroOT && (
                  <Text style={styles.errorText}>{errors.numeroOT}</Text>
                )}

                {loading ? (
                  <View style={{ marginTop: 30 }}>
                    <LoadingButton text="Validando.." status="primary" />
                  </View>
                ) : (
                  <View style={styles.buttonRowContainer}>
                    <Button
                      style={styles.modalButton}
                      onPress={() => setVisibleModal(false)}
                      status="basic"
                      appearance="outline"
                      size="medium"
                    >
                      Cancelar
                    </Button>
                    <Button
                      style={styles.modalButton}
                      onPress={handleSubmit as (values: any) => void}
                      disabled={!isValid}
                      size="medium"
                    >
                      Agregar
                    </Button>
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
      </Layout>
    </ScrollView>
  );
};
