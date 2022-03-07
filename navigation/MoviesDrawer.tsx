// Standard packages
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

// Redux
import { authActions } from "../store/auth-slice";

// Navigation
import MovieCategoriesStack from "./MovieCategoriesStack";
import MoviesStack from "./MoviesStack";
import ProfileStack from "./ProfileStack";

// Components
import CustomDrawer from "../components/CustomDrawer";
import FavoriteMovies from "../screens/FavoriteMovies";

// Models
import { User } from "../models/User";

export type MoviesDrawerParamsList = {
  Authentication: undefined;
  FavoriteMovies: undefined;
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

  const loginRedirectHandler = (navigation: MoviesDrawerProp) => {
    navigation.navigate("Authentication");
  };

  const logOutHandler = () => {
    dispatch(authActions.clearAuthenticatedUser());
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer
          logInHandler={() => loginRedirectHandler(navigation)}
          logOutHandler={logOutHandler}
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
      {userIsAuthenticated && (
        <Drawer.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            title: "Profile",
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MoviesDrawer;
