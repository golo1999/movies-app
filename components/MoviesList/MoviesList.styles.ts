// Standard packages
import { StyleSheet } from "react-native";

// Variables
import { COLORS } from "../../themes/variables";

export const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.PRIMARY, flex: 1 },
  loadingContainer: {
    alignItems: `center`,
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    justifyContent: `center`,
  },
  loadingText: { color: `white`, fontSize: 24 },
  moviesList: {
    alignItems: `flex-start`,
    display: `flex`,
  },
  moviesListItem: {
    alignItems: `center`,
    padding: 10,
    justifyContent: `center`,
  },
});
