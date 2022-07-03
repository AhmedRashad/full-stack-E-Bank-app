import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Button from "../Button";
import AppText from "../AppText";
import Screen from "../Screen";
import defaultStyles from "../../config/styles";
import AccountCard from "../AccountCard";

import { setCurrentAccount } from "../../../features/account/accountSlice";

function AccountPicker() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { userAccounts } = useSelector((state) => state.auth);
  const { current_account } = useSelector((state) => state.account);

  return (
    <>
      <AppText style={styles.text}>Chose Account</AppText>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <AppText style={styles.text}>
            {current_account ? current_account.account_name : "Select Account"}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <TouchableOpacity
          style={styles.containermodal}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <AppText style={styles.text_close}>CLOSE</AppText>
            </TouchableOpacity>
            <FlatList
              data={userAccounts}
              keyExtractor={(account) => account._id}
              renderItem={({ item }) => (
                <AccountCard
                  key={item._id}
                  account={item}
                  onPress={() => {
                    dispatch(setCurrentAccount(item));
                    setModalVisible(false);
                  }}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text_close: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  text: {
    flex: 1,
  },
  containermodal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "50%",
    alignItems: "center",
  },
});

export default AccountPicker;
