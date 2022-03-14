// Standard packages
import { DrawerActions } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

// Screens
import Profile from "../screens/Profile/Profile";

// Components
import CustomHeader from "../components/CustomHeader/CustomHeader";

// Models
import { User } from "../models/User";

export type ProfileStackParamsList = {
  Profile: undefined;
};

type ProfileStackScreenProp = NativeStackNavigationProp<
  ProfileStackParamsList,
  "Profile"
>;

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

export const ProfileStack = () => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const openDrawerHandler = (navigation: ProfileStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              headerLeft={{
                iconName: "menu",
                onPress: () => openDrawerHandler(navigation),
              }}
              title="Profile"
            />
          ),
        })}
      >
        {() => <Profile authenticatedUser={authenticatedUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
