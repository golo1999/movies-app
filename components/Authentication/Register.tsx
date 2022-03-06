// Standard packages
import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";

// Components
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import CustomText from "../UI/Text";

// Validation
import { registerSchema } from "../../validation/register-validation";

// Variables
import {
  authenticationButtonStyle,
  authenticationButtonTextStyle,
  authenticationInputStyle,
  authenticationInputTextStyle,
  authenticationRedirectTextStyle,
  COLORS,
} from "../../themes/variables";

// Methods
import { registerUser } from "../../firebase/firebase-methods";

// Stylings
import { registerStyles } from "../../styles/authentication-styles";
import globalStyles from "../../styles/global-styles";

type Props = {
  redirectToLoginHandler: (event?: GestureResponderEvent) => void;
};

type FormValues = { email: string; name: string; password: string };

const Register = ({ redirectToLoginHandler }: Props) => {
  const initialValues: FormValues = { email: "", name: "", password: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        registerUser({
          email: values.email,
          name: values.name,
          password: values.password,
          redirectToLoginHandler,
        })
      }
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
