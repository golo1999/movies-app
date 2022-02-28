// Standard packages
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Navigation
import MoviesNavigator from "./MoviesNavigator";

// Components
import CustomDrawer from "../components/CustomDrawer";
import Movies from "../screens/Movies";
import Profile from "../screens/Profile";

// Variables
import { COLORS } from "../themes/variables";

export type RootStackParamsList = {
  MoviesNavigator: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamsList>();

const MyDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="MoviesNavigator"
      screenOptions={{
        // drawerStyle: { backgroundColor: COLORS.SECONDARY },
        headerShown: false,
        // drawerActiveBackgroundColor: "white",
        // drawerActiveTintColor: COLORS.SECONDARY,
      }}
    >
      <Drawer.Screen name="MoviesNavigator" component={MoviesNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MyDrawerNavigator;
