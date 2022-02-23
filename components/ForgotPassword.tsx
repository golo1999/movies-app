// Standard packages
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";

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

type Props = { logInHandler: (event: GestureResponderEvent) => void };

const ForgotPassword = ({ logInHandler }: Props) => {
  const forgotPasswordHandler = () => {};

  return (
    <View>
      <CustomInput
        cursorColor="white"
        placeholder="Email"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          forgotPasswordStyles.input,
        ]}
      />
      <CustomButton
        onPress={forgotPasswordHandler}
        style={[authenticationButtonStyle, forgotPasswordStyles.resetButton]}
        text="Reset"
        textStyle={authenticationButtonTextStyle}
      />
      <CustomText
        onPress={logInHandler}
        style={[
          authenticationRedirectTextStyle,
          forgotPasswordStyles.logInText,
        ]}
        text="Log in"
      />
    </View>
  );
};

export default ForgotPassword;

const forgotPasswordStyles = StyleSheet.create({
  input: { marginVertical: 8 },
  logInText: { marginTop: 8 },
  resetButton: { marginVertical: 8 },
});
