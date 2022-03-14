interface IgnoreLogsProps {
  asyncStorageDeprecated: string;
  reactNativeGestureHandler: string;
  settingTimer: string;
}

const ignoreLogsMessages: IgnoreLogsProps = {
  asyncStorageDeprecated:
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  reactNativeGestureHandler:
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  settingTimer: "Setting a timer for a long period of time",
};

export default ignoreLogsMessages;
