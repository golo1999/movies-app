// Standard packages
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Redux
import { authActions } from "../store/auth-slice";

// Screens
import Authentication from "../screens/Authentication";
import MoviesFilteredByGenre from "../screens/MoviesFilteredByGenre";

// Components
import CustomHeader from "../components/CustomHeader";
import MovieDetails from "../screens/MovieDetails";

// Models
import { User } from "../models/User";

export type FilteredMoviesStackParamsList = {
  Authentication: undefined;
  MovieDetails: undefined;
  MoviesFilteredByGenre: undefined;
};

type FilteredMoviesStackScreenProp = NativeStackNavigationProp<
  FilteredMoviesStackParamsList,
  "MoviesFilteredByGenre"
>;

const Stack = createNativeStackNavigator<FilteredMoviesStackParamsList>();

export const FilteredMoviesStack = () => {
  const dispatch = useDispatch();

  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  const goBackHandler = (navigation: FilteredMoviesStackScreenProp) => {
    navigation.goBack();
  };

  const loginRedirectHandler = (navigation: FilteredMoviesStackScreenProp) => {
    navigation.navigate("Authentication");
  };

  const logoutHandler = () => {
    dispatch(authActions.clearAuthenticatedUser());
    alert("logged out");
  };

  const openDrawerHandler = (navigation: FilteredMoviesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="MoviesFilteredByGenre">
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              title="Authentication"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
              }}
              title="Categories"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MoviesFilteredByGenre"
        component={MoviesFilteredByGenre}
        options={({ navigation, route }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              headerRight={{
                iconName: userIsAuthenticated ? "logout" : "login",
                onPress: () => {
                  if (!userIsAuthenticated) {
                    loginRedirectHandler(navigation);
                  } else {
                    logoutHandler();
                  }
                },
              }}
              title={`${route.params?.genre} movies`}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FilteredMoviesStack;
