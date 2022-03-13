// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

export const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.PRIMARY,
    borderWidth: 5,
    display: `flex`,
    flexBasis: "50%",
    flexDirection: `column`,
  },
  genre: {
    color: "white",
    fontSize: 18,
    fontWeight: `bold`,
    textAlign: `center`,
  },
});
