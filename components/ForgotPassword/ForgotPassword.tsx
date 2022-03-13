// Standard packages
import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";

// Components
import CustomButton from "../Button/Button";
import CustomInput from "../Input/Input";
import { CustomText } from "../Text/Text";

// Validation
import { forgotPasswordSchema } from "../../validation/forgot-password-validation";

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
import { styles } from "./ForgotPassword.styles";

type Props = {
  redirectToLoginHandler: (event?: GestureResponderEvent) => void;
};

type FormValues = { email: string };

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
        <View style={{ position: "relative" }}>
          {formikProps.touched.email && formikProps.errors.email && (
            <View style={{ position: "absolute", top: -25, left: 0 }}>
              <Text style={[globalStyles.errorText]}>
                {formikProps.errors.email}
              </Text>
            </View>
          )}
          <CustomInput
            cursorColor="white"
            onChangeText={formikProps.handleChange(`email`)}
            placeholder="Email"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              styles.input,
            ]}
            value={formikProps.values.email}
          />
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[authenticationButtonStyle, styles.resetButton]}
            text="Reset"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={redirectToLoginHandler}
            style={[authenticationRedirectTextStyle, styles.logInText]}
            text="Login"
          />
        </View>
      )}
    </Formik>
  );
};

export default ForgotPassword;
