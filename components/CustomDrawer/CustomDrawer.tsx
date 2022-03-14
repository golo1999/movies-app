// Standard packages
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";

// Components
import { CustomNoUnderlayButton } from "../Button/Button";
import ProfileLogo from "../ProfileLogo/ProfileLogo";

// Models
import { User } from "../../models/User";

// Variables
import { COLORS } from "../../themes/variables";

// Stylings
import { profileLogoStyles, styles } from "./CustomDrawer.styles";

type Props = {
  logInHandler: () => void;
  logOutHandler: () => void;
  props: DrawerContentComponentProps;
};

const CustomDrawer = ({ logInHandler, logOutHandler, props }: Props) => {
  const authenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatedUser
  );

  const notAuthenticatedUser: User = useSelector(
    (state: RootStateOrAny) => state.auth.notAuthenticatedUser
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
            <ProfileLogo
              authenticatedUserName={authenticatedUser.name}
              containerStyles={profileLogoStyles.container}
              textStyles={profileLogoStyles.text}
            />
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
            <ProfileLogo
              authenticatedUserName={null}
              containerStyles={profileLogoStyles.container}
              textStyles={profileLogoStyles.text}
            />
            <Text
              style={[
                styles.headerText,
                { fontStyle: "italic", fontWeight: "bold", marginTop: 8 },
              ]}
            >
              {notAuthenticatedUser.name}
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
