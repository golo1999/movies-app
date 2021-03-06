// Standard packages
import { Formik } from "formik";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";

// Components
import CustomButton from "../Button/Button";
import CustomInput from "../Input/Input";
import { CustomText } from "../Text/Text";

// Validation
import { registerSchema } from "../../validation/register-validation";

// Colors
import COLORS from "../../environment/theme/Colors";

// Variables
import {
  authenticationButtonStyle,
  authenticationButtonTextStyle,
  authenticationInputStyle,
  authenticationInputTextStyle,
  authenticationRedirectTextStyle,
} from "../../environment/theme/Variables";

// Methods
import { registerUser } from "../../environment/firebase/firebase-methods";

// Stylings
import globalStyles from "../../styles/global-styles";
import { styles } from "./Register.styles";

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
          {formikProps.touched.name && formikProps.errors.name && (
            <Text style={[globalStyles.errorText]}>
              {formikProps.errors.name}
            </Text>
          )}
          <CustomInput
            cursorColor="white"
            onChangeText={formikProps.handleChange("name")}
            onBlur={formikProps.handleBlur("name")}
            placeholder="Full name"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              styles.input,
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
          <CustomButton
            onPress={() => formikProps.handleSubmit()}
            style={[authenticationButtonStyle, styles.registerButton]}
            text="Register"
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

export default Register;
