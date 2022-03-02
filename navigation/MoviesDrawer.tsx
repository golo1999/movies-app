// Standard packages
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector, RootStateOrAny } from "react-redux";

// Navigation
import MovieCategoriesStack from "./MovieCategoriesStack";
import MoviesStack from "./MoviesStack";

// Screens
import MovieGenres from "../screens/MovieGenres";

// Components
import CustomDrawer from "../components/CustomDrawer";
import FavoriteMovies from "../screens/FavoriteMovies";

// Models
import { User } from "../models/User";

// Variables
import { COLORS } from "../themes/variables";

export type MoviesDrawerParamsList = {
  FavoriteMovies: undefined;
  MovieCategoriesStack: undefined;
  MoviesStack: undefined;
};

const Drawer = createDrawerNavigator<MoviesDrawerParamsList>();

const MoviesDrawer = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="MoviesStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MoviesStack"
        component={MoviesStack}
        options={{ title: "Movies" }}
      />
      <Drawer.Screen
        name="MovieCategoriesStack"
        component={MovieCategoriesStack}
        options={{ title: "Categories" }}
      />
      {userIsAuthenticated && (
        <Drawer.Screen
          name="FavoriteMovies"
          component={FavoriteMovies}
          options={{ title: "Favorites" }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MoviesDrawer;
