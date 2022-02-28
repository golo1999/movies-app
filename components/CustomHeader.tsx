// Standard packages
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { DrawerActions } from "@react-navigation/native";

// Variables
import { COLORS } from "../themes/variables";

// Stylings
import customHeaderStyles from "../styles/custom-header-styles";

type Props = {
  headerLeft?: {
    iconName: any;
    onPress?: ((event?: GestureResponderEvent) => void) | undefined;
  };
  headerRight?: {
    iconName: any;
    onPress?: ((event?: GestureResponderEvent) => void) | undefined;
  };
  title: string;
};

const CustomHeader = ({ headerLeft, headerRight, title }: Props) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={customHeaderStyles(headerHeight).container}>
      <View style={[customHeaderStyles(headerHeight).leftIconContainer]}>
        {headerLeft && (
          <MaterialIcons
            name={headerLeft.iconName}
            onPress={headerLeft.onPress}
            style={[customHeaderStyles(headerHeight).icon]}
          />
        )}
      </View>
      <View style={[customHeaderStyles(headerHeight).titleContainer]}>
        <Text numberOfLines={1} style={customHeaderStyles(headerHeight).title}>
          {title}
        </Text>
      </View>
      <View style={[customHeaderStyles(headerHeight).rightIconContainer]}>
        {headerRight && (
          <MaterialIcons
            name={headerRight.iconName}
            onPress={headerRight.onPress}
            style={[customHeaderStyles(headerHeight).icon]}
          />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
