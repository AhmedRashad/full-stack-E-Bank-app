import React from "react";
import { StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <ListItem
            IconComponent={<Icon name="account" backgroundColor="#4a57ed" />}
            title={user.name}
            subTitle={user.email}
          />
        </View>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => dispatch(logout())}
        />
      </Screen>
    </>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
