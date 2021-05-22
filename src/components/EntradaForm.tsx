import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Input, Button, Toggle, Text } from "@ui-kitten/components";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
//Models
import { IEntrada } from "../models/IEntrada";
//Component
import { LoadingButton } from "./shared/LoadingButton";
//Theme
import { styles } from "../theme/appTheme";
//Store
import { RootState } from "../store/store";
//Constants
import { DANGER_COLOR_500 } from "../constants/shared";

interface FormProps {
  initialValues: IEntrada;
  loading: boolean;
  handleSubmit: (model: IEntrada) => any; // accion submit (create/update)
}

//#region Form Constants
const NUMERO_OT = "numeroOT";
const CODIGO_BARRA = "codigoBarra";
const CANTIDAD = "cantidad";
//#endregion Form Constants

//#region VALIDATION SHEMA
const entradaValidationSchema: Yup.SchemaOf<IEntrada> = Yup.object({
  numeroOT: Yup.string()
    .required("Ingrese el nombre del número OT.")
    .min(3, "Ingrese mínimo 3 caracteres.")
    .max(20, "Ingrese máximo 20 caracteres."),
  codigoBarra: Yup.string()
    .required("Ingrese el código de barra.")
    .min(3, "Ingrese mínimo 3 caracteres.")
    .max(20, "Ingrese máximo 20 caracteres."),
  cantidad: Yup.number()
    .required("Ingrese la cantidad.")
    .typeError("La cantidad contiene caracteres no validos.")
    .min(1, "La cantidad no puede ser cero.")
    .integer("La cantidad debe ser un número entero."),
});
//#endregion VALIDATION SHEMA

export const EntradaForm = React.memo(
  ({ initialValues, handleSubmit, loading }: FormProps) => {
    const descripcionInput = useRef<Input>(null);
    const precioInput = useRef<Input>(null);
    const existenciaInput = useRef<Input>(null);

    useEffect(() => {
      //descripcionInput.current!.focus();
    }, []);

    return (
      <Formik
        validationSchema={entradaValidationSchema}
        initialValues={initialValues}
        onSubmit={(model: IEntrada) => {
          model.codigoBarra = model.codigoBarra.trim();
          model.cantidad = Number(model.cantidad);
          handleSubmit(model);
        }}
      >
        {(props: FormikProps<IEntrada>) => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            setFieldValue,
            handleChange,
            handleBlur,
            isValid,
          } = props;
          return (
            <>
              <Text category="s1">Código de barra</Text>
              <Input
                style={styles.formikInput}
                placeholder="Nombre"
                value={values.codigoBarra}
                onChangeText={handleChange(CODIGO_BARRA)}
                onBlur={handleBlur(CODIGO_BARRA)}
                ref={descripcionInput}
                returnKeyType="next"
                onSubmitEditing={() => {
                  precioInput.current!.focus();
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
                ref={existenciaInput}
                returnKeyType="done"
                disabled={loading}
              />
              {errors.cantidad && (
                <Text style={styles.errorText}>{errors.cantidad}</Text>
              )}

              {loading ? (
                <LoadingButton text={"Cargando"} status={"primary"} />
              ) : (
                <Button
                  style={{ marginTop: 20 }}
                  onPress={handleSubmit as (values: any) => void}
                  disabled={!isValid}
                >
                  {"Agregar"}
                </Button>
              )}
            </>
          );
        }}
      </Formik>
    );
  }
);
