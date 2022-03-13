// Standard packages
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

// Stylings
import { styles } from "./CustomHeader.styles";

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
    <View style={styles(headerHeight).container}>
      <View style={[styles(headerHeight).leftIconContainer]}>
        {headerLeft && (
          <MaterialIcons
            name={headerLeft.iconName}
            onPress={headerLeft.onPress}
            style={[styles(headerHeight).icon]}
          />
        )}
      </View>
      <View style={[styles(headerHeight).titleContainer]}>
        <Text numberOfLines={1} style={styles(headerHeight).title}>
          {title}
        </Text>
      </View>
      <View style={[styles(headerHeight).rightIconContainer]}>
        {headerRight && (
          <MaterialIcons
            name={headerRight.iconName}
            onPress={headerRight.onPress}
            style={[styles(headerHeight).icon]}
          />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
