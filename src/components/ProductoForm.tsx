import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Input, Button, Toggle, Text } from "@ui-kitten/components";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
//Models
import { IProducto, IProductoForm } from "../models/IProducto";
//Component
import { LoadingButton } from "../components/shared/LoadingButton";
//Theme
import { styles } from "../theme/appTheme";
//Store
import { RootState } from "../store/store";
//Constants
import { DANGER_COLOR_500 } from "../constants/shared";

interface FormProps {
  initialValues: IProductoForm;
  loading: boolean;
  deleteLoading: boolean;
  handleSubmit: (model: IProductoForm) => any; // accion submit (create/update)
  newItem: boolean;
  productoId?: string;
}

//#region Form Constants
const DESCRIPCION = "descripcion";
const PRECIO = "precio";
const EXISTENCIA = "existencia";
const ACTIVO = "activo";
const TIENE_INVETNARIO = "tieneInventario";
//#endregion Form Constants

//#region VALIDATION SHEMA
const productoValidationSchema: Yup.SchemaOf<IProductoForm> = Yup.object({
  descripcion: Yup.string()
    .min(3, "Ingrese mínimo 3 caracteres.")
    .max(20, "Ingrese máximo 20 caracteres.")
    .required("Ingrese el nombre del producto."),
  precio: Yup.number()
    .required("Ingrese el precio.")
    .typeError("El precio contiene caracteres no validos.")
    .positive("El precio debe ser mayor a cero.")
    .test(
      "maxDigitsAfterDecimal",
      "El precio debe tener 2 dígitos después del decimal o menos.",
      (number) => /^\d+(\.\d{1,2})?$/.test(number?.toString()!)
    ),
  existencia: Yup.number()
    .required("Ingrese el cantidad en existencia (stock).")
    .typeError("La cantidad contiene caracteres no validos.")
    .min(0, "La cantidad no puede ser negativa.")
    .integer("La cantidad debe ser un número entero."),
  activo: Yup.boolean().required(),
  tieneInventario: Yup.boolean().required(),
  sincronizado: Yup.boolean().required(),
});
//#endregion VALIDATION SHEMA

export const ProductoForm = React.memo(
  ({
    initialValues,
    handleSubmit,
    loading,
    newItem,
    deleteLoading,
    productoId,
  }: FormProps) => {
    const productos: IProducto[] = useSelector(
      (state: RootState) => state.productos
    );

    const descripcionInput = useRef<Input>(null);
    const precioInput = useRef<Input>(null);
    const existenciaInput = useRef<Input>(null);

    useEffect(() => {
      if (newItem) descripcionInput.current!.focus();
    }, []);

    return (
      <Formik
        validationSchema={productoValidationSchema}
        initialValues={initialValues}
        onSubmit={(model: IProductoForm) => {
          model.descripcion = model.descripcion.trim();

          //Validar nombre del producto
          let nombresProductos: string[] = newItem
            ? productos.map((prod) => prod.descripcion)
            : productos
                .filter((c) => c.id !== productoId)
                .map((prod) => prod.descripcion);

          let result = nombresProductos.find((n) => n === model.descripcion);

          if (result) {
            showMessage({
              message: "Ya existe un producto con este nombre.",
              type: "danger",
              animated: true,
              floating: true,
              icon: "danger",
            });
            return;
          }

          model.precio = Number(model.precio);
          model.existencia = Number(model.existencia);
          handleSubmit(model);
        }}
      >
        {(props: FormikProps<IProductoForm>) => {
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
              <Text category="s1">Nombre</Text>
              <Input
                style={styles.formikInput}
                placeholder="Nombre"
                value={values.descripcion}
                onChangeText={handleChange(DESCRIPCION)}
                onBlur={handleBlur(DESCRIPCION)}
                ref={descripcionInput}
                returnKeyType="next"
                onSubmitEditing={() => {
                  precioInput.current!.focus();
                }}
                disabled={loading || deleteLoading}
              />
              {errors.descripcion && (
                <Text style={styles.errorText}>{errors.descripcion}</Text>
              )}

              <Text style={styles.inputLabel} category="s1">
                Precio
              </Text>
              <Input
                style={styles.formikInput}
                placeholder="Precio"
                value={values.precio?.toString().replace(" ", "")}
                onChangeText={handleChange(PRECIO)}
                onBlur={handleBlur(PRECIO)}
                keyboardType="number-pad"
                ref={precioInput}
                returnKeyType={values.tieneInventario ? "next" : "done"}
                onSubmitEditing={() => {
                  values.tieneInventario && existenciaInput.current!.focus();
                }}
                disabled={loading || deleteLoading}
              />
              {errors.precio && (
                <Text style={styles.errorText}>{errors.precio}</Text>
              )}

              <View style={styles.rowView}>
                <Text style={styles.formikInput} category="s1">
                  Activo
                </Text>
                <Toggle
                  checked={values.activo}
                  onChange={(value) => setFieldValue(ACTIVO, value)}
                  disabled={loading || deleteLoading}
                />
              </View>

              <View style={styles.rowView}>
                <Text style={styles.formikInput} category="s1">
                  Gestionar inventario
                </Text>
                <Toggle
                  checked={values.tieneInventario}
                  onChange={(value: boolean) => {
                    !value && setFieldValue(EXISTENCIA, 0);
                    setFieldValue(TIENE_INVETNARIO, value);
                  }}
                  disabled={loading || deleteLoading}
                />
              </View>

              {values.tieneInventario && (
                <View>
                  <Text style={styles.inputLabel} category="s1">
                    Cantidad en existencia (stock)
                  </Text>
                  <Input
                    style={styles.formikInput}
                    placeholder="Cantidad en Existencia (Stock)"
                    value={values.existencia?.toString().replace(/[. ]/g, "")}
                    onChangeText={handleChange(EXISTENCIA)}
                    onBlur={handleBlur(EXISTENCIA)}
                    keyboardType="number-pad"
                    ref={existenciaInput}
                    returnKeyType="done"
                    disabled={loading || deleteLoading}
                  />
                  {errors.existencia && (
                    <Text style={styles.errorText}>{errors.existencia}</Text>
                  )}
                </View>
              )}

              {loading || deleteLoading ? (
                <LoadingButton
                  text={deleteLoading && !newItem ? "Eliminando" : "Cargando"}
                  status={deleteLoading && !newItem ? "danger" : "primary"}
                />
              ) : (
                <Button
                  style={{ marginTop: 20 }}
                  onPress={handleSubmit as (values: any) => void}
                  disabled={!isValid}
                >
                  {newItem ? "Agregar" : "Actualizar"}
                </Button>
              )}
            </>
          );
        }}
      </Formik>
    );
  }
);
