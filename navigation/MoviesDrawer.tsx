// Standard packages
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

// Navigation
import FavoriteMoviesStack from "./FavoriteMoviesStack";
import MovieCategoriesStack from "./MovieCategoriesStack";
import MoviesStack from "./MoviesStack";
import ProfileStack from "./ProfileStack";

// Firebase
import { signOutUser } from "../environment/firebase/firebase-methods";

// Components
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";

// Colors
import COLORS from "../environment/theme/Colors";

// Models
import { User } from "../models/User";

export type MoviesDrawerParamsList = {
  Authentication: undefined;
  FavoriteMoviesStack: undefined;
  MovieCategoriesStack: undefined;
  MoviesStack: undefined;
  ProfileStack: undefined;
};

export type MoviesDrawerProp = NativeStackNavigationProp<
  MoviesDrawerParamsList,
  "MoviesStack"
>;

const Drawer = createDrawerNavigator<MoviesDrawerParamsList>();

const MoviesDrawer = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const dispatch = useDispatch();

  const navigation = useNavigation<MoviesDrawerProp>();

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer
          logInHandler={() => navigation.navigate("Authentication")}
          logOutHandler={() => signOutUser({ dispatch })}
          props={{ ...props }}
        />
      )}
      initialRouteName="MoviesStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MoviesStack"
        component={MoviesStack}
        options={{
          drawerActiveBackgroundColor: COLORS.TERTIARY,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          title: "Movies",
        }}
      />
      <Drawer.Screen
        name="MovieCategoriesStack"
        component={MovieCategoriesStack}
        options={{
          drawerActiveBackgroundColor: COLORS.TERTIARY,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          title: "Categories",
        }}
      />
      {userIsAuthenticated && (
        <Drawer.Screen
          name="FavoriteMoviesStack"
          component={FavoriteMoviesStack}
          options={{
            drawerActiveBackgroundColor: COLORS.TERTIARY,
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: "white",
            title: "Favorites",
          }}
        />
      )}
      {userIsAuthenticated && (
        <Drawer.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            drawerActiveBackgroundColor: COLORS.TERTIARY,
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: "white",
            title: "Profile",
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MoviesDrawer;
