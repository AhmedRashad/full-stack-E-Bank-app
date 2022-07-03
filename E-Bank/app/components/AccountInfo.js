import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import AppText from "./Text";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const { current_account } = useSelector((state) => state.account);
  return (
    <View style={styles.container}>
      <ScrollView>
        <AppText style={styles.account_info}>
          Account Name: {current_account.account_name}
        </AppText>
        <AppText style={styles.account_info}>
          Account Number: {current_account.account_number}
        </AppText>
        <AppText style={styles.account_info}>
          Current Balance:{current_account.current_balance}
        </AppText>
        <AppText style={styles.account_info}>
          Account Owner: {current_account.username}
        </AppText>
        <AppText style={styles.account_info}>
          Email: {current_account.email}
        </AppText>
        <AppText style={styles.account_info}>
          Phone Number: {current_account.phone}
        </AppText>
        <AppText style={styles.account_info}>
          Birth Date: {current_account.birth_date.split("T")[0]}
        </AppText>
        <AppText style={styles.account_info}>
          Work: {current_account.work}
        </AppText>
        <AppText style={styles.account_info}>
          Country: {current_account.country}
        </AppText>
        <AppText style={styles.account_info}>
          City: {current_account.city}
        </AppText>
        <AppText style={styles.account_info}>
          Street Address: {current_account.streetAddress}
        </AppText>
      </ScrollView>
    </View>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#e4f0f5",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    height: 300,
  },
  account_info: {
    fontSize: 18,
    color: "#000",
    marginVertical: 10,
    width: "100%",
  },
});
