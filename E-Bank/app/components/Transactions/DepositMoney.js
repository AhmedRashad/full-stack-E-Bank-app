import * as Yup from "yup";

import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage, Form, FormField, SubmitButton } from "../forms";
import ActivityIndicator from "../ActivityIndicator";
import AppText from "../Text";
import AccountPicker from "./AccountPicker";

import {
  depositMoney,
  setDepositModal,
} from "../../../features/account/accountSlice";
// schema for the form
const depositMoneySchema = Yup.object().shape({
  amount: Yup.number().required("Amount is Required").positive().integer(),
});

const DepositMoney = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    deposit_success,
    isError,
    current_account,
    message,
    deposit_modal,
  } = useSelector((state) => state.account);
  const { userAccounts } = useSelector((state) => state.auth);
  const id = current_account?._id;

  const handleSubmit = ({ amount }) => {
    dispatch(depositMoney({ id, amount }));
  };

  useEffect(() => {
    if (deposit_success) {
      dispatch(setDepositModal(false));
      Alert.alert("Success", "Money Deposited Successfully");
    }
  }, [deposit_success]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deposit_modal}
        onRequestClose={() => {
          dispatch(setDepositModal(false));
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            dispatch(setDepositModal(false));
          }}
        >
          <View style={styles.modal}>
            <ScrollView>
              <View>
                <ActivityIndicator visible={isLoading} />
                <AppText>Deposit Money</AppText>
                <Form
                  initialValues={{ amount: 0 }}
                  onSubmit={handleSubmit}
                  validationSchema={depositMoneySchema}
                >
                  <FormField
                    name="amount"
                    placeholder="Amount"
                    keyboardType="numeric"
                    textContentType="numeric"
                  />
                  <AccountPicker />
                  <SubmitButton title="Deposit Money" />
                </Form>
                <ErrorMessage error={message} visible={isError} />
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DepositMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scrollModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "50%",
  },
});
