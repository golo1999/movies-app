// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../themes/variables";

const customHeaderStyles = (headerHeight: number) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: COLORS.SECONDARY,
      flexDirection: "row",
      height: headerHeight,
      width: "100%",
    },
    icon: { color: "white", fontSize: 24 },
    leftIconContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      marginStart: 16,
    },
    rightIconContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      marginEnd: 16,
    },
    title: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    titleContainer: {
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
  });

export default customHeaderStyles;
