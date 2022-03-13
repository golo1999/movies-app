// Standard packages
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";

// Screens
import Profile from "../screens/Profile";

// Components
import CustomHeader from "../components/CustomHeader/CustomHeader";

export type ProfileStackParamsList = {
  Profile: undefined;
};

type ProfileStackScreenProp = NativeStackNavigationProp<
  ProfileStackParamsList,
  "Profile"
>;

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

export const ProfileStack = () => {
  const openDrawerHandler = (navigation: ProfileStackScreenProp) => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
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
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
