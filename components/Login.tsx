// Standard packages
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Navigation
import { RootStackParamsList } from "../routes/myStackNavigator";

// Components
import CustomButton from "./Button";
import CustomInput from "./Input";
import CustomText from "./Text";

// Variables
import {
  authenticationButtonStyle,
  authenticationButtonTextStyle,
  authenticationInputStyle,
  authenticationInputTextStyle,
  authenticationRedirectTextStyle,
} from "../themes/variables";

type Props = {
  forgotPasswordHandler(): void;
  registerHandler(): void;
};

type MoviesScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `Movies`
>;

const Login = ({ forgotPasswordHandler, registerHandler }: Props) => {
  const navigation = useNavigation<MoviesScreenProp>();

  const logInHandler = () => {
    navigation.navigate("Movies");
  };

  return (
    <View>
      <CustomInput
        cursorColor="white"
        placeholder="Email"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          loginStyles.input,
        ]}
      />
      <CustomInput
        cursorColor="white"
        placeholder="Password"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          loginStyles.input,
        ]}
        type="password"
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
        onPress={logInHandler}
        style={[authenticationButtonStyle, loginStyles.loginButton]}
        text="Log in"
        textStyle={authenticationButtonTextStyle}
      />
      <CustomText
        onPress={registerHandler}
        style={[authenticationRedirectTextStyle, loginStyles.registerText]}
        text="Register"
      />
    </View>
  );
};

export default Login;

const loginStyles = StyleSheet.create({
  forgotPasswordText: { marginVertical: 8 },
  input: { marginVertical: 8 },
  loginButton: { marginVertical: 8 },
  registerText: { marginTop: 8 },
});
