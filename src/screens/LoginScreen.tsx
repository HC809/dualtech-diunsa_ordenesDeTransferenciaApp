import React, { useRef, useState } from "react";
import { Text, Button, Input, Icon, IconProps } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
//Styles
import { styles } from "../theme/appTheme";
import { Background } from "../components/shared/Background";
import { Logo } from "../components/shared/Logo";
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../components/shared/Icons";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { KeyboardAvoidingView, View } from "react-native";

interface ILoginFormProps {
  username: string;
  password: string;
}

const USERNAME = "username";
const PASSWORD = "password";

const ventaAgregarProductoValidationSchema: Yup.SchemaOf<ILoginFormProps> =
  Yup.object({
    username: Yup.string().required("Usuario requerido."),
    password: Yup.string().required("Contraseña requerida."),
  });

const initialValues: ILoginFormProps = {
  username: "",
  password: "",
};

export const LoginScreen = () => {
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
  } = useFormik<ILoginFormProps>({
    initialValues: initialValues,
    onSubmit: (model: ILoginFormProps) => {
      console.log(model);
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
