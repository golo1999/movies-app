// Standard packages
import { StyleSheet } from "react-native";

// Colors
import COLORS from "../../environment/theme/Colors";

export const styles = StyleSheet.create({
  detailsContainer: { margin: 16 },
  heading: { color: COLORS.SECONDARY, fontSize: 36, fontWeight: "bold" },
  image: { aspectRatio: 1, height: undefined, width: "100%" },
  mainContainer: { backgroundColor: COLORS.PRIMARY, flexGrow: 1 },
  text: { color: "white", fontSize: 16, textAlign: "justify" },
});
