// Standard packages
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { RootStateOrAny, useSelector } from "react-redux";

// Variables
import { COLORS } from "../themes/variables";
import { User } from "../models/User";

type Props = {
  logInHandler: () => void;
  logOutHandler: () => void;
  props: DrawerContentComponentProps;
};

const CustomDrawer = ({ logInHandler, logOutHandler, props }: Props) => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const userIsAuthenticated = Object.keys(authenticatedUser).length > 0;

  return (
    <View style={customDrawerStyles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.SECONDARY }}
      >
        {userIsAuthenticated ? (
          <View style={[customDrawerStyles.header]}>
            <View style={[customDrawerStyles.headerIconContainer]}>
              <Text style={[customDrawerStyles.headerIcon]}>
                {authenticatedUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              style={[
                customDrawerStyles.headerText,
                { fontWeight: "bold", marginVertical: 8 },
              ]}
            >
              {authenticatedUser.name}
            </Text>
            <Text
              style={[
                customDrawerStyles.headerText,
                { fontStyle: "italic", marginTop: 8 },
              ]}
            >
              {authenticatedUser.email}
            </Text>
          </View>
        ) : (
          <View style={[customDrawerStyles.header]}>
            <View style={[customDrawerStyles.headerIconContainer]}>
              <Text style={[customDrawerStyles.headerIcon]}>?</Text>
            </View>
            <Text
              style={[
                customDrawerStyles.headerText,
                { fontStyle: "italic", fontWeight: "bold", marginTop: 8 },
              ]}
            >
              John Doe
            </Text>
          </View>
        )}
        <DrawerItemList {...props} />
        {userIsAuthenticated ? (
          <DrawerItem label="Log out" onPress={logOutHandler} />
        ) : (
          <DrawerItem label="Log in" onPress={logInHandler} />
        )}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const customDrawerStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SECONDARY,
    flex: 1,
  },
  header: { alignItems: "center", flexDirection: "column", marginVertical: 16 },
  headerIcon: { color: "white", fontSize: 36, fontWeight: "bold" },
  headerIconContainer: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 1000,
    justifyContent: "center",
    marginBottom: 8,
    width: "25%",
  },
  headerText: { color: "white", fontSize: 16, textAlign: "center" },
});
