// Standard packages
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Firebase
import { signOutUser } from "../firebase/firebase-methods";

// Components
import Authentication from "../screens/Authentication";
import CustomHeader from "../components/CustomHeader";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";

// Models
import { User } from "../models/User";

export type MoviesStackParamsList = {
  Authentication: undefined;
  Movies: undefined;
  MovieDetails: undefined;
};

type MoviesStackScreenProp = NativeStackNavigationProp<
  MoviesStackParamsList,
  "Movies"
>;

const Stack = createNativeStackNavigator<MoviesStackParamsList>();

export const MoviesStack = () => {
  const dispatch = useDispatch();

  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  const goBackHandler = (navigation: MoviesStackScreenProp) => {
    navigation.goBack();
  };

  const loginRedirectHandler = (navigation: MoviesStackScreenProp) => {
    navigation.navigate("Authentication");
  };

  const openDrawerHandler = (navigation: MoviesStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="Movies">
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
        name="Movies"
        component={Movies}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
              }}
              headerRight={{
                iconName: userIsAuthenticated ? "logout" : "login",
                onPress: () => {
                  if (!userIsAuthenticated) {
                    loginRedirectHandler(navigation);
                  } else {
                    signOutUser({ dispatch });
                  }
                },
              }}
              title="Movies"
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
                iconName: "arrow-back",
                onPress: () => goBackHandler(navigation),
              }}
              headerRight={{
                iconName: "star-outline",
                onPress: () => {
                  if (userIsAuthenticated) {
                    alert("Added to favorites");
                  } else {
                    loginRedirectHandler(navigation);
                  }
                },
              }}
              title="Movie details"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MoviesStack;
