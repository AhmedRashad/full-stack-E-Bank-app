import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import colors from "../config/colors";
import Container from "./Container";

const AccountCard = ({ account, onPress }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor={colors.light}
      onPress={onPress}
    >
      <Container>
        <View style={styles.account_container}>
          <Text style={styles.name}>{account.account_name}</Text>
          <Text style={styles.amount}>${account.current_balance}</Text>
        </View>
      </Container>
    </TouchableHighlight>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  account_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.light,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "90%",
  },
});
