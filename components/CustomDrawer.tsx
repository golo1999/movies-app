// Standard packages
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// Variables
import { COLORS } from "../themes/variables";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View style={customDrawerStyles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.SECONDARY }}
      >
        <View style={customDrawerStyles.header}>
          <Text>Header</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const customDrawerStyles = StyleSheet.create({
  container: { backgroundColor: COLORS.SECONDARY, flex: 1 },
  header: { alignItems: "center", flexDirection: "column", marginVertical: 16 },
});
