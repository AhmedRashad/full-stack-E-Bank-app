import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import HomeIcons from "../components/Home/HomeIcons";
import AppText from "../components/Text";
import AccountInfo from "../components/AccountInfo";
import colors from "../config/colors";
import { useSelector } from "react-redux";

const AccountDetails = ({ navigation }) => {
  const { current_account } = useSelector((state) => state.account);
  return (
    <Screen>
      <AppText style={styles.text}>{current_account.account_name}</AppText>
      <HomeIcons />
      <AccountInfo />
    </Screen>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: colors.black,
    textAlign: "center",
    marginTop: 50,
  },
});
