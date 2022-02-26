// Standard packages
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";

// Navigation
import { RootStackParamsList } from "../../routes/myStackNavigator";

// Components
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import CustomText from "../UI/Text";

// Methods
import { emailIsValid } from "../../themes/methods";

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
  RootStackParamsList,
  `Movies`
>;

type FormValues = { email: string; password: string };

const loginSchema = yup.object({
  email: yup
    .string()
    .required(`Email is required`)
    .test(`email-valid`, `Email is not valid`, (value) => emailIsValid(value)),
  password: yup
    .string()
    .required(`Password is required`)
    .min(8, (chars) => `Password must be at least ${chars.min} characters`),
});

const Login = ({
  redirectToForgotPasswordHandler,
  redirectToRegisterHandler,
}: Props) => {
  const navigation = useNavigation<MoviesScreenProp>();

  const initialValues: FormValues = { email: ``, password: `` };

  const logInHandler = (values: FormValues) => {
    console.log(values);
    navigation.pop();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => logInHandler(values)}
      validationSchema={loginSchema}
    >
      {(formikProps) => (
        <View>
          {formikProps.touched.email && formikProps.errors.email && (
            <Text style={[globalStyles.errorText]}>
              {formikProps.errors.email}
            </Text>
          )}
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
          {formikProps.touched.password && formikProps.errors.password && (
            <Text style={[globalStyles.errorText]}>
              {formikProps.errors.password}
            </Text>
          )}
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
