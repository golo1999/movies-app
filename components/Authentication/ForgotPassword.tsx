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
import { forgotPasswordStyles } from "../../styles/authentication-styles";
import globalStyles from "../../styles/global-styles";

type Props = {
  redirectToLoginHandler: (event?: GestureResponderEvent) => void;
};

type FormValues = { email: string };

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required(`Email is required`)
    .test(`email-valid`, `Email is not valid`, (value) => emailIsValid(value)),
});

const ForgotPassword = ({ redirectToLoginHandler }: Props) => {
  const initialValues: FormValues = { email: `` };

  const resetPasswordHandler = (values: FormValues) => {
    console.log(values);
    redirectToLoginHandler();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => resetPasswordHandler(values)}
      validationSchema={forgotPasswordSchema}
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
            placeholder="Email"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              forgotPasswordStyles.input,
            ]}
            value={formikProps.values.email}
          />
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[
              authenticationButtonStyle,
              forgotPasswordStyles.resetButton,
            ]}
            text="Reset"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={redirectToLoginHandler}
            style={[
              authenticationRedirectTextStyle,
              forgotPasswordStyles.logInText,
            ]}
            text="Login"
          />
        </View>
      )}
    </Formik>
  );
};

export default ForgotPassword;
