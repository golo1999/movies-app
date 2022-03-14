// Standard packages
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

// Stylings
import { styles } from "./ProfileLogo.styles";

interface Props {
  authenticatedUserName: string | null;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const ProfileLogo = ({
  authenticatedUserName,
  containerStyles,
  textStyles,
}: Props) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.icon, textStyles]}>
        {authenticatedUserName
          ? authenticatedUserName.charAt(0).toUpperCase()
          : "?"}
      </Text>
    </View>
  );
};

export default ProfileLogo;
