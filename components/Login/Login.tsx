// Standard packages
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

// Navigation
import { MoviesStackParamsList } from "../../navigation/MoviesStack";

// Firebase
import { authenticateUser } from "../../firebase/firebase-methods";

// Components
import CustomButton from "../Button/Button";
import CustomInput from "../Input/Input";
import { CustomText } from "../Text/Text";

// Validation
import { loginSchema } from "../../validation/login-validation";

// Variables
import {
  authenticationButtonStyle,
  authenticationButtonTextStyle,
  authenticationInputStyle,
  authenticationInputTextStyle,
  authenticationRedirectTextStyle,
  COLORS,
} from "../../themes/variables";

// Stylings
import globalStyles from "../../styles/global-styles";
import { styles } from "./Login.styles";

type Props = {
  redirectToForgotPasswordHandler(): void;
  redirectToRegisterHandler(): void;
};

type MoviesScreenProp = NativeStackNavigationProp<
  MoviesStackParamsList,
  "Movies"
>;

type FormValues = {
  email: string;
  goBackHandler?: () => void;
  password: string;
  rememberMe: boolean;
};

const Login = ({
  redirectToForgotPasswordHandler,
  redirectToRegisterHandler,
}: Props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation<MoviesScreenProp>();

  const initialValues: FormValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        authenticateUser({
          dispatch,
          email: values.email,
          goBackHandler: () => navigation.pop(),
          password: values.password,
          rememberMe: values.rememberMe,
        })
      }
      validationSchema={loginSchema}
    >
      {(formikProps) => (
        <View>
          <Text style={[globalStyles.errorText]}>
            {formikProps.touched.email &&
              formikProps.errors.email &&
              `${formikProps.errors.email}`}
          </Text>
          <CustomInput
            cursorColor="white"
            onChangeText={formikProps.handleChange("email")}
            onBlur={formikProps.handleBlur("email")}
            placeholder="Email"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              styles.input,
            ]}
            value={formikProps.values.email}
          />
          <Text style={[globalStyles.errorText]}>
            {formikProps.touched.password &&
              formikProps.errors.password &&
              `${formikProps.errors.password}`}
          </Text>
          <CustomInput
            cursorColor="white"
            onChangeText={formikProps.handleChange("password")}
            onBlur={formikProps.handleBlur("password")}
            placeholder="Password"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              styles.input,
            ]}
            type="password"
            value={formikProps.values.password}
          />
          <CustomText
            onPress={redirectToForgotPasswordHandler}
            style={[authenticationRedirectTextStyle, styles.forgotPasswordText]}
            text="Forgot password?"
          />
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[authenticationButtonStyle, styles.loginButton]}
            text="Log in"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={redirectToRegisterHandler}
            style={[authenticationRedirectTextStyle, styles.registerText]}
            text="Register"
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;
