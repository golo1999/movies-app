// Standard packages
import React from "react";
import { GestureResponderEvent, StyleProp, TextStyle } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

// Components
import { CustomText as _CustomText } from "./Text";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<TextStyle>;
  text: string;
}

describe("Given the Text component", () => {
  const TEXT = "Text";

  const Text = ({ onPress, style, text }: Props) => (
    <_CustomText onPress={onPress} style={style} text={text} />
  );

  describe("When checking if it can be used", () => {
    it("Then I expect that it can display a text", () => {
      const { findAllByText } = render(<Text text={TEXT} />);

      expect(findAllByText).not.toBeNull();
    });
  });
});
