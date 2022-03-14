// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

export const styles = StyleSheet.create({
  detailsContainer: { margin: 16 },
  heading: { color: COLORS.SECONDARY, fontSize: 36, fontWeight: "bold" },
  image: { aspectRatio: 1, height: undefined, width: "100%" },
  mainContainer: { backgroundColor: COLORS.PRIMARY },
  text: { color: "white", fontSize: 16, textAlign: "justify" },
});
