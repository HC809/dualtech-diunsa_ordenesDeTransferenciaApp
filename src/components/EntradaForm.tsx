import React, { useRef, Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Input, Button, Layout, Text, Modal } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
//Models
import { IEntrada } from "../models/IEntrada";
//Component
import { LoadingButton } from "./shared/LoadingButton";
import { ModalIngresarNumeroOT } from "./ModalIngresarNumeroOT";
//Theme
import { styles } from "../theme/appTheme";
//Constants
import { ScrollView } from "react-native-gesture-handler";

interface FormProps {
  initialValues: IEntrada;
  loading: boolean;
  handleFormikSubmit: (model: IEntrada) => any; // accion submit (create/update)
  visibleModalOT: boolean;
  setVisibleModalOT: Dispatch<SetStateAction<boolean>>;
}

//#region Form Constants
const NUMERO_OT = "numeroOT";
const CODIGO_BARRA = "codigoBarra";
const CANTIDAD = "cantidad";
//#endregion Form Constants

//#region VALIDATION SHEMA
const entradaValidationSchema: Yup.SchemaOf<IEntrada> = Yup.object({
  numeroOT: Yup.string().required("Ingrese el número OT."),
  codigoBarra: Yup.string()
    .required("Ingrese el código de barra.")
    .min(3, "Ingrese mínimo 2 caracteres.")
    .max(50, "Ingrese máximo 25 caracteres."),
  cantidad: Yup.number()
    .required("Ingrese la cantidad.")
    .typeError("La cantidad contiene caracteres no validos.")
    .min(1, "La cantidad no puede ser cero.")
    .integer("La cantidad debe ser un número entero."),
});
//#endregion VALIDATION SHEMA

export const EntradaForm = React.memo(
  ({
    initialValues,
    handleFormikSubmit,
    loading,
    visibleModalOT,
    setVisibleModalOT,
  }: FormProps) => {
    const cantidadInput = useRef<Input>(null);

    const {
      handleSubmit,
      handleChange,
      values,
      errors,
      isValid,
      handleBlur,
      setFieldValue,
      resetForm,
    } = useFormik<IEntrada>({
      initialValues: initialValues,
      onSubmit: (model: IEntrada) => {
        model.codigoBarra = model.codigoBarra.trim();
        model.cantidad = Number(model.cantidad);
        handleFormikSubmit(model);
      },
      validationSchema: entradaValidationSchema,
    });

    const modalIngresarOT = () => {
      return (
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {}}
          visible={visibleModalOT}
        >
          <ModalIngresarNumeroOT
            setVisibleModal={setVisibleModalOT}
            setFormikFieldValue={setFieldValue}
            numeroOTConstant={NUMERO_OT}
          />
        </Modal>
      );
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout style={{ padding: 18 }} level="4">
          <Text category="s1">{`Número: ${values.numeroOT}`}</Text>
        </Layout>
        <Layout style={styles.flexLayout}>
          <Text category="s1">Código de barra</Text>
          <Input
            style={styles.formikInput}
            placeholder="Nombre"
            value={values.codigoBarra}
            onChangeText={handleChange(CODIGO_BARRA)}
            onBlur={handleBlur(CODIGO_BARRA)}
            returnKeyType="next"
            onSubmitEditing={() => {
              cantidadInput.current!.focus();
            }}
            disabled={loading}
          />
          {errors.codigoBarra && (
            <Text style={styles.errorText}>{errors.codigoBarra}</Text>
          )}

          <Text style={styles.inputLabel} category="s1">
            Cantidad
          </Text>
          <Input
            style={styles.formikInput}
            placeholder="Cantidad en Existencia (Stock)"
            value={values.cantidad?.toString().replace(/[. ]/g, "")}
            onChangeText={handleChange(CANTIDAD)}
            onBlur={handleBlur(CANTIDAD)}
            keyboardType="number-pad"
            ref={cantidadInput}
            returnKeyType="done"
            disabled={loading}
          />
          {errors.cantidad && (
            <Text style={styles.errorText}>{errors.cantidad}</Text>
          )}

          {loading ? (
            <LoadingButton text={"Cargando"} status={"primary"} />
          ) : (
            <View style={styles.buttonRowContainer}>
              <Button
                style={styles.modalButton}
                onPress={resetForm as (values: any) => void}
                status="basic"
                appearance="outline"
                size="medium"
              >
                Finalizar
              </Button>
              <Button
                style={styles.modalButton}
                onPress={handleSubmit as (values: any) => void}
                disabled={!isValid}
                status="primary"
                size="medium"
              >
                Agregar
              </Button>
            </View>
          )}
        </Layout>
        {visibleModalOT && modalIngresarOT()}
      </ScrollView>
    );
  }
);
