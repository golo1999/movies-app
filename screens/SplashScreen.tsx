// Standard packages
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Navigation
import { RootStackParamsList } from "../navigation/myStackNavigator";

// Variables
import { APP_NAME as appName, COLORS } from "../themes/variables";

type MoviesListScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `MoviesDrawer`
>;

const SplashScreen = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  const navigation = useNavigation<MoviesListScreenProp>();

  useEffect(() => {
    const loadingTimer = setTimeout(
      () => navigation.replace("MoviesDrawer"),
      1500
    );

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <View style={[splashScreenStyles.container]}>
      <Text style={splashScreenStyles.logo}>{appName}</Text>
      <Icon
        containerStyle={{ marginTop: 8 }}
        color={COLORS.SECONDARY}
        name="movie"
        iconStyle={{ fontSize: 50 }}
        tvParallaxProperties={undefined}
      />
    </View>
  );
};

export default SplashScreen;

const splashScreenStyles = StyleSheet.create({
  container: {
    alignItems: `center`,
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    justifyContent: `center`,
  },
  logo: {
    color: COLORS.SECONDARY,
    fontSize: 50,
    fontWeight: `bold`,
    marginBottom: 8,
  },
});
