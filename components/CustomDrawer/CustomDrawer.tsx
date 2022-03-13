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
import { CustomNoUnderlayButton } from "../Button/Button";

// Models
import { User } from "../../models/User";

// Variables
import { COLORS } from "../../themes/variables";

// Stylings
import { styles } from "./CustomDrawer.styles";

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
