// Standard packages
import React, { useState } from "react";
import { Text, View } from "react-native";

// Components
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

// Variables
import { APP_NAME as appName } from "../../environment/theme/Variables";

// Stylings
import { styles } from "./Authentication.styles";

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
    authenticationType === "LOGIN" ? (
      <Login
        redirectToForgotPasswordHandler={redirectToForgotPasswordHandler}
        redirectToRegisterHandler={redirectToRegisterHandler}
      />
    ) : authenticationType === "REGISTER" ? (
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
    <View style={styles.container}>
      <Text style={styles.logo}>{appName}</Text>
      {selectedAuthenticationType}
    </View>
  );
};

export default Authentication;
