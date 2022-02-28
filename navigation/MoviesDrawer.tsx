// Standard packages
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Navigation
import MoviesStack from "./MoviesStack";

// Components
import CustomDrawer from "../components/CustomDrawer";
import Profile from "../screens/Profile";

// Variables
import { COLORS } from "../themes/variables";

export type MoviesDrawerParamsList = {
  MoviesStack: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<MoviesDrawerParamsList>();

const MoviesDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="MoviesStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="MoviesStack" component={MoviesStack} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MoviesDrawer;
