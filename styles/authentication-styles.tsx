// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../themes/variables";

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

export const forgotPasswordStyles = StyleSheet.create({
  input: { marginVertical: 8 },
  logInText: { marginTop: 8 },
  resetButton: { marginVertical: 8 },
});

export const loginStyles = StyleSheet.create({
  forgotPasswordText: { marginVertical: 8 },
  input: { marginVertical: 8 },
  loginButton: { marginVertical: 8 },
  registerText: { marginTop: 8 },
});

export const registerStyles = StyleSheet.create({
  input: { marginVertical: 8 },
  logInText: { marginTop: 8 },
  registerButton: { marginVertical: 8 },
});

export default authenticationStyles;
