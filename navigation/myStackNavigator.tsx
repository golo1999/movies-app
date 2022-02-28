// Standard packages
import React from "react";
import { Icon } from "react-native-elements";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import { RootStateOrAny, useSelector } from "react-redux";

// Navigation
import MyDrawerNavigator from "./myDrawerNavigator";

// Components
import Authentication from "../screens/Authentication";
import CustomHeader from "../components/CustomHeader";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";
import SplashScreen from "../screens/SplashScreen";

// Models
import { User } from "../models/User";

// Variables
import { COLORS } from "../themes/variables";

export type RootStackParamsList = {
  Authentication: undefined;
  MoviesDrawer: undefined;
  MovieDetails: undefined;
  SplashScreen: undefined;
};

type MoviesListScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  `MoviesDrawer`
>;

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const MyStackNavigator = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  console.log(`auth`);
  console.log(userIsAuthenticated);
  console.log(authenticatedUser);

  const logInHandler = (navigation: MoviesListScreenProp) => {
    navigation.navigate("Authentication");
  };

  const logOutHandler = () => {};

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.PRIMARY },
        headerStyle: { backgroundColor: COLORS.SECONDARY },
        headerTintColor: `white`,
        headerTitleAlign: `center`,
      }}
    >
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={({ navigation }) => ({
          headerRight: () => [
            // userIsAuthenticated && (
            //   <Icon
            //     color="white"
            //     key="logout-icon"
            //     name="logout"
            //     onPress={logOutHandler}
            //     tvParallaxProperties={undefined}
            //   />
            // ),
            // !userIsAuthenticated && [
            //   <Icon
            //     color="white"
            //     key="login-icon"
            //     name="login"
            //     onPress={() => {
            //       logInHandler(navigation);
            //     }}
            //     tvParallaxProperties={undefined}
            //   />,
            // ],
            <Icon name="star" tvParallaxProperties={undefined} />,
          ],
        })}
      />
      <Stack.Screen
        name="MoviesDrawer"
        component={MyDrawerNavigator}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Movies" />,
          // headerLeft: () => [
          //   <Icon
          //     color="white"
          //     key="hamburger-menu-icon"
          //     name="menu"
          //     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          //     tvParallaxProperties={undefined}
          //   />,
          // ],
          // headerRight: () => [
          //   userIsAuthenticated && (
          //     <Icon
          //       color="white"
          //       key="logout-icon"
          //       name="logout"
          //       onPress={logOutHandler}
          //       tvParallaxProperties={undefined}
          //     />
          //   ),
          //   !userIsAuthenticated && [
          //     <Icon
          //       color="white"
          //       key="login-icon"
          //       name="login"
          //       onPress={() => {
          //         logInHandler(navigation);
          //       }}
          //       tvParallaxProperties={undefined}
          //     />,
          //   ],
          // ],
        })}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyStackNavigator;
