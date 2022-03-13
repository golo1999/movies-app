// Standard packages
import { ToastAndroid } from "react-native";

interface Props {
  duration: number;
  gravity: number;
  message: string;
  visible: boolean;
}

const CustomToast = ({ duration, gravity, message, visible }: Props) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(message, duration, gravity, 25, 50);
  }

  return null;
};

export default CustomToast;
