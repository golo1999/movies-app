// Standard packages
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { RootStateOrAny, useSelector } from "react-redux";

// Components
import { CustomNoUnderlayButton } from "./UI/Button";

// Models
import { User } from "../models/User";

// Variables
import { COLORS } from "../themes/variables";

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
    <View style={styles.container}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: COLORS.SECONDARY }}
        {...props}
      >
        {userIsAuthenticated ? (
          <View style={[styles.header]}>
            <View style={[styles.headerIconContainer]}>
              <Text style={[styles.headerIcon]}>
                {authenticatedUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              style={[
                styles.headerText,
                { fontWeight: "bold", marginVertical: 8 },
              ]}
            >
              {authenticatedUser.name}
            </Text>
            <Text
              style={[styles.headerText, { fontStyle: "italic", marginTop: 8 }]}
            >
              {authenticatedUser.email}
            </Text>
          </View>
        ) : (
          <View style={[styles.header]}>
            <View style={[styles.headerIconContainer]}>
              <Text style={[styles.headerIcon]}>?</Text>
            </View>
            <Text
              style={[
                styles.headerText,
                { fontStyle: "italic", fontWeight: "bold", marginTop: 8 },
              ]}
            >
              John Doe
            </Text>
          </View>
        )}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <CustomNoUnderlayButton
        onPress={userIsAuthenticated ? logOutHandler : logInHandler}
        style={styles.authenticationButton}
        text={userIsAuthenticated ? "Log out" : "Log in"}
        textStyle={styles.authenticationButtonText}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  authenticationButton: { marginVertical: 8 },
  authenticationButtonText: { color: "white" },
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
