import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { finishSubmit, finishDelete } from "../store/actions/ui/loadingActions";
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

export const EntradaForm = React.memo(
  ({ initialValues, visibleModalOT, setVisibleModalOT }: FormProps) => {
    const dispatch = useDispatch();

    const productosEntrada: IProducto[] = useSelector(
      (state: RootState) => state.productosEntrada
    );

    const [nombreProducto, setNombreProducto] = useState<string>("");
    const [cantidadSugerida, setCantidadSugerida] = useState<number>(0);

    const { loading, wasSuccessfull }: ILoadingResponse = useSelector(
      (state: RootState) => state.ui.deleteLoading
    );

    const { wasSuccessfull: enviadosCorrectamente }: ILoadingResponse =
      useSelector((state: RootState) => state.ui.submitLoading);

    const [loadingValidarCodigoBarra, setLoadingValidarCodigoBarra] =
      useState<boolean>(false);

    //#region VALIDATION SHEMA
    const entradaValidationSchema: Yup.SchemaOf<IEntrada> = Yup.object({
      numeroOT: Yup.string().required("Ingrese el n??mero OT."),
      codigoBarra: Yup.string()
        .required("Ingrese el c??digo de barra.")
        .min(3, "Ingrese m??nimo 2 caracteres.")
        .max(50, "Ingrese m??ximo 25 caracteres."),
      cantidad: Yup.number()
        .required("Ingrese la cantidad.")
        .typeError("La cantidad contiene caracteres no validos.")
        .min(1, "La cantidad no puede ser cero.")
        .max(
          cantidadSugerida,
          "Cantidad ingresada no disponible para la orden."
        )
        .integer("La cantidad debe ser un n??mero entero."),
    });
    //#endregion VALIDATION SHEMA

    //Producto agregado correctamente
    useEffect(() => {
      if (wasSuccessfull) {
        dispatch(finishDelete(false));
        setCantidadSugerida(0);
        setNombreProducto("");
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
        codigoBarraInput.current?.focus();
      }
    }, [wasSuccessfull, dispatch]);

    //Productos Enviado Correctamente
    useEffect(() => {
      if (enviadosCorrectamente) {
        setFieldValue(NUMERO_OT, "");
        setCantidadSugerida(0);
        setNombreProducto("");
        resetForm;
      }
    }, [enviadosCorrectamente]);

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
        const productoEnLista = productosEntrada.find(
          (c) => c.Barcode === model.codigoBarra
        );
        if (productoEnLista) {
          Alert.alert(
            "Error",
            `El producto con el c??digo de barra '${model.codigoBarra}' ya esta en la lista.`,
            [
              {
                text: "Ok",
              },
            ]
          );
        } else {
          dispatch(
            startAddProducto({
              id: uuidv4(),
              Barcode: model.codigoBarra.trim(),
              Quantity: Number(model.cantidad),
              Name: nombreProducto,
            })
          );
        }
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
          <Text category="s1">{`N??mero: ${values.numeroOT}`}</Text>
          {errors.numeroOT && (
            <Text style={styles.errorText}>{errors.numeroOT}</Text>
          )}
        </Layout>
        <Layout style={styles.flexLayout}>
          <Text category="s1">C??digo de barra</Text>
          <Input
            style={styles.formikInput}
            placeholder="C??digo de barra"
            caption={`Producto: ${nombreProducto}`}
            value={values.codigoBarra}
            onChangeText={handleChange(CODIGO_BARRA)}
            onBlur={handleBlur(CODIGO_BARRA)}
            returnKeyType="next"
            ref={codigoBarraInput}
            onSubmitEditing={async () => {
              setLoadingValidarCodigoBarra(true);
              try {
                const response: IApiResponse =
                  await fetchEntrada.getCantidadSugerida(
                    values.numeroOT,
                    values.codigoBarra
                  );
                setLoadingValidarCodigoBarra(false);
                if (response.ok) {
                  const { quantity, name } = response.data;
                  setNombreProducto(name);
                  setCantidadSugerida(quantity);
                  setFieldValue(CANTIDAD, 0);
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
                setLoadingValidarCodigoBarra(false);
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
            disabled={loading || loadingValidarCodigoBarra}
          />
          {errors.codigoBarra && (
            <Text style={styles.errorText}>{errors.codigoBarra}</Text>
          )}
          <View>
            <Button
              style={{ marginTop: 20 }}
              onPress={() => {
                if (!loading || !loadingValidarCodigoBarra) {
                  setCantidadSugerida(0);
                  setNombreProducto("");
                  setFieldValue(CODIGO_BARRA, "");
                }
              }}
              size="tiny"
              appearance="outline"
              status={loadingValidarCodigoBarra ? "info" : "primary"}
              disabled={loading}
            >
              {loadingValidarCodigoBarra
                ? "Cargando..."
                : "Limpiar c??digo de barra"}
            </Button>
          </View>

          <Text style={styles.inputLabel} category="s1">
            Cantidad
          </Text>
          <Input
            style={styles.formikInput}
            placeholder="Cantidad de producto"
            // caption={`Cantidad sugerida: ${cantidadSugerida}`}
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
