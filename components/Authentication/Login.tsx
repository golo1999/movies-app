// Standard packages
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Navigation
import { RootStackParamsList } from "../../routes/myStackNavigator";

// Components
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import CustomText from "../UI/Text";

// Variables
import {
  authenticationButtonStyle,
  authenticationButtonTextStyle,
  authenticationInputStyle,
  authenticationInputTextStyle,
  authenticationRedirectTextStyle,
  COLORS,
} from "../../themes/variables";

type Props = {
  forgotPasswordHandler(): void;
  registerHandler(): void;
};

type MoviesScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `Movies`
>;

type FormValues = { email: string; password: string };

const Login = ({ forgotPasswordHandler, registerHandler }: Props) => {
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
    >
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <CustomInput
            cursorColor="white"
            onChangeText={handleChange(`email`)}
            placeholder="Email"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              loginStyles.input,
            ]}
            value={values.email}
          />
          <CustomInput
            cursorColor="white"
            onChangeText={handleChange(`password`)}
            placeholder="Password"
            placeholderTextColor="white"
            style={[
              authenticationInputStyle,
              authenticationInputTextStyle,
              loginStyles.input,
            ]}
            type="password"
            value={values.password}
          />
          <CustomText
            onPress={forgotPasswordHandler}
            style={[
              authenticationRedirectTextStyle,
              loginStyles.forgotPasswordText,
            ]}
            text="Forgot password?"
          />
          <CustomButton
            onPress={() => handleSubmit()}
            style={[authenticationButtonStyle, loginStyles.loginButton]}
            text="Log in"
            textStyle={authenticationButtonTextStyle}
            underlayColor={COLORS.TERTIARY}
          />
          <CustomText
            onPress={registerHandler}
            style={[authenticationRedirectTextStyle, loginStyles.registerText]}
            text="Register"
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;

const loginStyles = StyleSheet.create({
  forgotPasswordText: { marginVertical: 8 },
  input: { marginVertical: 8 },
  loginButton: { marginVertical: 8 },
  registerText: { marginTop: 8 },
});
