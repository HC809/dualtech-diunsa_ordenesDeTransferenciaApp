import React, { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Text, Input, Button, Divider } from "@ui-kitten/components";
import { View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
//Styles
import { styles } from "../theme/appTheme";
import { fetchEntrada } from "../helpers/api";
import { IApiResponse } from "../models/shared/IApiResponse";

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
            setVisibleModal(false);
            setFormikFieldValue(numeroOTConstant, model.numeroOT);
            // try {
            //   const response: IApiResponse = await fetchEntrada.validarOT(
            //     model.numeroOT
            //   );

            //   if (response.ok) {
            //     setVisibleModal(false);
            //     setFormikFieldValue(numeroOTConstant, model.numeroOT);
            //   } else {
            //     showMessage({
            //       message: response.errorMsg,
            //       type: "danger",
            //       position: "top",
            //       animated: true,
            //       floating: false,
            //       icon: "warning",
            //       duration: 6000,
            //     });
            //   }
            // } catch (error) {
            //   console.log(error.response);
            //   alert(error);
            //   // showMessage({
            //   //   message: error,
            //   //   type: "danger",
            //   //   position: "top",
            //   //   animated: true,
            //   //   floating: false,
            //   //   icon: "warning",
            //   //   duration: 6000,
            //   // });
            // }
          }}
        >
          {(props: FormikProps<IIngresarOTForm>) => {
            const {
              values,
              errors,
              handleSubmit,
              setFieldValue,
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
              </View>
            );
          }}
        </Formik>
      </Layout>
    </ScrollView>
  );
};
