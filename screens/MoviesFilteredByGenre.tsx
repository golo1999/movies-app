// Standard packages
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  genreName: string;
}

const MoviesFilteredByGenre = ({ genreName }: Props) => {
  return (
    <View>
      <Text>{genreName}</Text>
    </View>
  );
};

export default MoviesFilteredByGenre;

const styles = StyleSheet.create({});
