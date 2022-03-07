// Standard packages
import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

// Redux
import { authActions } from "../../store/auth-slice";

// Navigation
import { MoviesStackParamsList } from "../../navigation/MoviesStack";

// Firebase
import { authenticateUser } from "../../firebase/firebase-methods";

// Components
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import { CustomText } from "../UI/Text";

// Models
import { User } from "../../models/User";

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
import { loginStyles } from "../../styles/authentication-styles";
import globalStyles from "../../styles/global-styles";

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

  const authenticateUserHandler = ({
    email,
    goBackHandler,
    password,
    rememberMe,
  }: FormValues) => {
    authenticateUser({
      dispatch,
      email,
      goBackHandler: () => goBackHandler,
      password,
      rememberMe,
    });
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
            onChangeText={formikProps.handleChange(`email`)}
            onBlur={formikProps.handleBlur(`email`)}
            placeholder="Email"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              loginStyles.input,
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
            onChangeText={formikProps.handleChange(`password`)}
            onBlur={formikProps.handleBlur(`password`)}
            placeholder="Password"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              loginStyles.input,
            ]}
            type="password"
            value={formikProps.values.password}
          />
          <CustomText
            onPress={redirectToForgotPasswordHandler}
            style={[
              authenticationRedirectTextStyle,
              loginStyles.forgotPasswordText,
            ]}
            text="Forgot password?"
          />
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[authenticationButtonStyle, loginStyles.loginButton]}
            text="Log in"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={redirectToRegisterHandler}
            style={[authenticationRedirectTextStyle, loginStyles.registerText]}
            text="Register"
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;
