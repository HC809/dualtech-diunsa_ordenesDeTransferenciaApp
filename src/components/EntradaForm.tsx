import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Alert, View } from "react-native";
import { Input, Button, Layout, Text, Modal } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
//Models
import { IEntrada } from "../models/IEntrada";
import { IProducto } from "../models/IProducto";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
//Component
import { LoadingButton } from "./shared/LoadingButton";
import { ModalIngresarNumeroOT } from "./ModalIngresarNumeroOT";
//Theme
import { styles } from "../theme/appTheme";
//Constants
import { PRIMARY_COLOR_600 } from "../constants/shared";
//Actions
import { startAddProducto } from "../store/actions/productos/productosActions";
import { finishSubmit } from "../store/actions/ui/loadingActions";
//Store
import { RootState } from "../store/store";
import { fetchEntrada } from "../helpers/api";
import { IApiResponse } from "../models/shared/IApiResponse";

interface FormProps {
  initialValues: IEntrada;
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
  ({ initialValues, visibleModalOT, setVisibleModalOT }: FormProps) => {
    const dispatch = useDispatch();

    const [nombreProducto, setNombreProducto] = useState<string>("");
    const [cantidadSugerida, setCantidadSugerida] = useState<number>(0);

    const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
      (state: RootState) => state.ui.submitLoading
    );

    useEffect(() => {
      if (wasSuccessfull) {
        dispatch(finishSubmit(false));
        setFieldValue(CODIGO_BARRA, "");
        setFieldValue(CANTIDAD, 0);
        showMessage({
          message: "Producto agregado correctamente!",
          type: "success",
          animated: true,
          floating: true,
          icon: "success",
          backgroundColor: PRIMARY_COLOR_600,
        });
        //codigoBarraInput.current?.focus();
      }
    }, [wasSuccessfull, dispatch]);

    const codigoBarraInput = useRef<Input>(null);
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
        dispatch(
          startAddProducto({
            id: uuidv4(),
            Barcode: model.codigoBarra.trim(),
            Quantity: Number(model.cantidad),
            Name: nombreProducto,
          })
        );
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
            placeholder="Código de barra"
            caption={`Producto: ${nombreProducto}`}
            value={values.codigoBarra}
            onChangeText={handleChange(CODIGO_BARRA)}
            onBlur={handleBlur(CODIGO_BARRA)}
            returnKeyType="next"
            ref={codigoBarraInput}
            onSubmitEditing={async () => {
              console.log(values.numeroOT);
              console.log(values.codigoBarra);
              try {
                const response: IApiResponse =
                  await fetchEntrada.getCantidadSugerida(
                    values.numeroOT,
                    values.codigoBarra
                  );
                const { quantity, name } = response.data;
                if (response.ok) {
                  setNombreProducto(name);
                  setCantidadSugerida(quantity);
                  setFieldValue(CANTIDAD, quantity);
                  cantidadInput.current!.focus();
                } else {
                  setNombreProducto("");
                  setCantidadSugerida(0);
                  Alert.alert("No encontrado", response.errorMsg, [
                    {
                      text: "Ok",
                    },
                  ]);
                }
              } catch (error) {
                setNombreProducto("");
                setCantidadSugerida(0);
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
            }}
            disabled={loading}
          />
          {errors.codigoBarra && (
            <Text style={styles.errorText}>{errors.codigoBarra}</Text>
          )}
          <View>
            <Button
              style={{ marginTop: 20 }}
              onPress={() => setFieldValue(CODIGO_BARRA, "")}
              size="tiny"
              appearance="outline"
            >
              Limpiar código de barra
            </Button>
          </View>

          <Text style={styles.inputLabel} category="s1">
            Cantidad
          </Text>
          <Input
            style={styles.formikInput}
            placeholder="Cantidad de producto"
            caption={`Cantidad sugerida: ${cantidadSugerida}`}
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

          <View style={{ marginTop: 30 }}>
            {loading ? (
              <LoadingButton text={"Agregando"} status={"primary"} />
            ) : (
              <Button
                onPress={handleSubmit as (values: any) => void}
                disabled={!isValid}
                status="primary"
                size="medium"
              >
                Agregar
              </Button>
            )}
          </View>
        </Layout>
        {visibleModalOT && modalIngresarOT()}
      </ScrollView>
    );
  }
);
