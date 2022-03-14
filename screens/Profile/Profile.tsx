// Standard packages
import React from "react";
import { View } from "react-native";

// Components
import ProfileLogo from "../../components/ProfileLogo/ProfileLogo";

// Models
import { User } from "../../models/User";

// Stylings
import { profileLogoStyles, styles } from "./Profile.styles";

interface Props {
  authenticatedUser: User;
}

const Profile = ({ authenticatedUser }: Props) => {
  return (
    <View style={styles.container}>
      <ProfileLogo
        authenticatedUserName={authenticatedUser.name}
        containerStyles={profileLogoStyles.container}
        textStyles={profileLogoStyles.text}
      />
    </View>
  );
};

export default Profile;
