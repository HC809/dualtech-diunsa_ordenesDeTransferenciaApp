import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Text, Button, Input, IconProps } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { useFormik } from "formik";
import * as Yup from "yup";
//Styles
import { styles } from "../theme/appTheme";
//Components
import { Background } from "../components/shared/Background";
import { Logo } from "../components/shared/Logo";
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../components/shared/Icons";
//Constants
import { INICIO_SCREEN } from "../constants/screens";
//Models
import { ILogin } from "../models/ILogin";

const USERNAME = "username";
const PASSWORD = "password";

const ventaAgregarProductoValidationSchema: Yup.SchemaOf<ILogin> = Yup.object({
  username: Yup.string().required("Usuario requerido."),
  password: Yup.string().required("Contraseña requerida."),
});

const initialValues: ILogin = {
  username: "",
  password: "",
};

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const [securePasswordTextEntry, setSecurePasswordTextEntry] =
    useState<boolean>(true);

  const passwordInput = useRef<Input>(null);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    touched,
    setFieldTouched,
  } = useFormik<ILogin>({
    initialValues: initialValues,
    onSubmit: (model: ILogin) => {
      console.log(model);
      navigation.replace(INICIO_SCREEN);
    },
    validationSchema: ventaAgregarProductoValidationSchema,
  });

  const renderPasswordVisibleIcon = (props: IconProps) => (
    <TouchableWithoutFeedback
      onPress={() => setSecurePasswordTextEntry(!securePasswordTextEntry)}
    >
      {securePasswordTextEntry ? (
        <EyeIcon {...props} />
      ) : (
        <EyeOffIcon {...props} />
      )}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Background />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <Logo />
        <ScrollView style={styles.flexLayout}>
          <Text status="primary" style={styles.loginText}>
            Ordenes de Transferencia
          </Text>
          <Text style={styles.inputLabel} category="s1" status="primary">
            Usuario
          </Text>
          <Input
            placeholder="Usuario"
            accessoryLeft={UserIcon}
            value={values.username}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange(USERNAME)}
            onBlur={() => setFieldTouched(USERNAME)}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInput.current!.focus();
            }}
          />
          {touched.username && errors.username && (
            <Text
              style={styles.errorText}
              status="danger"
              appearance="hint"
              category="p2"
            >
              {errors.username}
            </Text>
          )}

          <Text style={styles.inputLabel} category="s1" status="primary">
            Contraseña
          </Text>
          <Input
            placeholder="Contraseña"
            accessoryLeft={LockIcon}
            accessoryRight={renderPasswordVisibleIcon}
            value={values.password}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={securePasswordTextEntry}
            onChangeText={handleChange(PASSWORD)}
            onBlur={() => setFieldTouched(PASSWORD)}
            returnKeyType="done"
            ref={passwordInput}
          />
          {touched.password && errors.password && (
            <Text
              style={styles.errorText}
              status="danger"
              appearance="hint"
              category="p2"
            >
              {errors.password}
            </Text>
          )}

          {/* {!!errorMessage && (
        <Text status="danger" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )} */}

          <View style={{ paddingVertical: 35 }}>
            <Button
              size="medium"
              disabled={!isValid}
              onPress={() => handleSubmit()}
            >
              Iniciar Sesión
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
