// Standard packages
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";

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
} from "../../themes/variables";

type Props = {
  logInHandler: (event: GestureResponderEvent) => void;
};

const Register = ({ logInHandler }: Props) => {
  const registerHandler = () => {};

  return (
    <View>
      <CustomInput
        cursorColor="white"
        placeholder="Email"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          registerStyles.input,
        ]}
      />
      <CustomInput
        cursorColor="white"
        placeholder="Password"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          registerStyles.input,
        ]}
        type="password"
      />
      <CustomInput
        cursorColor="white"
        placeholder="Full name"
        placeholderTextColor="white"
        style={[
          authenticationInputStyle,
          authenticationInputTextStyle,
          registerStyles.input,
        ]}
      />
      <CustomButton
        onPress={registerHandler}
        style={[authenticationButtonStyle, registerStyles.registerButton]}
        text="Register"
        textStyle={authenticationButtonTextStyle}
      />
      <CustomText
        onPress={logInHandler}
        style={[authenticationRedirectTextStyle, registerStyles.logInText]}
        text="Log in"
      />
    </View>
  );
};

export default Register;

const registerStyles = StyleSheet.create({
  input: { marginVertical: 8 },
  logInText: { marginTop: 8 },
  registerButton: { marginVertical: 8 },
});
