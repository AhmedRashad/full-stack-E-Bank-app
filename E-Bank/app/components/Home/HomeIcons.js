import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";
import Icon from "../Icon";
import { useSelector, useDispatch } from "react-redux";
import {
  setChargeModal,
  setTransferModal,
  setDepositModal,
  resetAccount,
} from "../../../features/account/accountSlice";
import ChargeMoney from "../Transactions/ChargeMoney";
import DepositMoney from "../Transactions/DepositMoney";
import TransferMoney from "../Transactions/TransferMoney";
const HomeIcons = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(setTransferModal(true));
        }}
        style={styles.icon}
      >
        <TransferMoney />
        <Icon
          name="bank-transfer"
          size={70}
          iconColor={colors.light}
          backgroundColor={colors.primary}
        />
        <Text style={styles.iconText}>Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(resetAccount());
          dispatch(setDepositModal(true));
        }}
        style={styles.icon}
      >
        <DepositMoney />
        <Icon
          name="bank-transfer-in"
          size={70}
          iconColor={colors.light}
          backgroundColor={colors.secondary}
        />
        <Text style={styles.iconText}>Deposit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(setChargeModal(true));
        }}
        style={styles.icon}
      >
        <ChargeMoney />
        <Icon
          name="bank-transfer-out"
          size={70}
          iconColor={colors.light}
          backgroundColor={colors.danger}
        />
        <Text style={styles.iconText}>Withdrawal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeIcons;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 20,
    color: colors.medium,
    marginTop: 10,
  },
});
