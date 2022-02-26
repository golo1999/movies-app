// Standard packages
import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";

// Components
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import CustomText from "../UI/Text";

// Methods
import { emailIsValid, nameIsValid } from "../../themes/methods";

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
import { registerStyles } from "../../styles/authentication-styles";
import globalStyles from "../../styles/global-styles";

type Props = {
  redirectToLoginHandler: (event?: GestureResponderEvent) => void;
};

type FormValues = { email: string; name: string; password: string };

const registerSchema = yup.object({
  email: yup
    .string()
    .required(`Email is required`)
    .test(`email-valid`, `Email is not valid`, (value) => emailIsValid(value)),
  name: yup
    .string()
    .required(`Name is required`)
    .test(`name-valid`, `Name is not valid`, (value) => nameIsValid(value))
    .min(2, (chars) => `Name must be at least ${chars.min} characters`),
  password: yup
    .string()
    .required(`Password is required`)
    .min(8, (chars) => `Password must be at least ${chars.min} characters`),
});

const Register = ({ redirectToLoginHandler }: Props) => {
  const initialValues: FormValues = { email: ``, name: ``, password: `` };

  const registerHandler = (values: FormValues) => {
    console.log(values);
    redirectToLoginHandler();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => registerHandler(values)}
      validationSchema={registerSchema}
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
              registerStyles.input,
            ]}
            value={formikProps.values.email}
          />
          {formikProps.touched.name && formikProps.errors.name && (
            <Text style={[globalStyles.errorText]}>
              {formikProps.errors.name}
            </Text>
          )}
          <CustomInput
            cursorColor="white"
            onChangeText={formikProps.handleChange(`name`)}
            onBlur={formikProps.handleBlur(`name`)}
            placeholder="Full name"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              registerStyles.input,
            ]}
            value={formikProps.values.name}
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
              registerStyles.input,
            ]}
            type="password"
            value={formikProps.values.password}
          />
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[authenticationButtonStyle, registerStyles.registerButton]}
            text="Register"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={redirectToLoginHandler}
            style={[authenticationRedirectTextStyle, registerStyles.logInText]}
            text="Login"
          />
        </View>
      )}
    </Formik>
  );
};

export default Register;
