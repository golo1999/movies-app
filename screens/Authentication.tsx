// Standard packages
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import ForgotPassword from "../components/Authentication/ForgotPassword";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

// Variables
import { APP_NAME as appName } from "../themes/variables";

// Stylings
import authenticationStyles from "../styles/authentication-styles";

const Authentication = () => {
  const [authenticationType, setAuthenticationType] = useState("LOGIN");

  const redirectToForgotPasswordHandler = () => {
    switchAuthenticationType("FORGOT_PASSWORD");
  };

  const redirectToLoginHandler = () => {
    switchAuthenticationType("LOGIN");
  };

  const redirectToRegisterHandler = () => {
    switchAuthenticationType("REGISTER");
  };

  const selectedAuthenticationType =
    authenticationType === `LOGIN` ? (
      <Login
        redirectToForgotPasswordHandler={redirectToForgotPasswordHandler}
        redirectToRegisterHandler={redirectToRegisterHandler}
      />
    ) : authenticationType === `REGISTER` ? (
      <Register redirectToLoginHandler={redirectToLoginHandler} />
    ) : (
      <ForgotPassword redirectToLoginHandler={redirectToLoginHandler} />
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
