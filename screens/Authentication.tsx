// Standard packages
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import ForgotPassword from "../components/Authentication/ForgotPassword";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

// Variables
import { APP_NAME as appName, COLORS } from "../themes/variables";

const Authentication = () => {
  const [authenticationType, setAuthenticationType] = useState("LOGIN");

  const resetPasswordHandler = () => {
    switchAuthenticationType("LOGIN");
  };

  const registerHandler = () => {
    switchAuthenticationType("LOGIN");
  };

  const selectedAuthenticationType =
    authenticationType === `LOGIN` ? (
      <Login
        forgotPasswordHandler={() =>
          switchAuthenticationType("FORGOT_PASSWORD")
        }
        registerHandler={() => switchAuthenticationType("REGISTER")}
      />
    ) : authenticationType === `REGISTER` ? (
      <Register
        logInHandler={() => switchAuthenticationType("LOGIN")}
        registerHandler={registerHandler}
      />
    ) : (
      <ForgotPassword
        logInHandler={() => switchAuthenticationType("LOGIN")}
        resetPasswordHandler={resetPasswordHandler}
      />
    );

  const switchAuthenticationType = (newAuthenticationType: string) => {
    if (authenticationType !== newAuthenticationType) {
      setAuthenticationType(newAuthenticationType);
    }
  };

  return (
    <View style={authenticationStyles.container}>
      <Text style={authenticationStyles.logo}>{appName}</Text>
      {selectedAuthenticationType}
    </View>
  );
};

export default Authentication;

const authenticationStyles = StyleSheet.create({
  container: {
    display: `flex`,
    flex: 1,
    flexDirection: `column`,
    justifyContent: `center`,
    margin: 32,
  },
  logo: {
    color: COLORS.SECONDARY,
    fontSize: 50,
    fontWeight: `bold`,
    marginBottom: 40,
    textAlign: `center`,
  },
});
