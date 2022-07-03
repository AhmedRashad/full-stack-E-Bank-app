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
  transferMoney,
  setTransferModal,
} from "../../../features/account/accountSlice";
// schema for the form
const transferMoneySchema = Yup.object().shape({
  amount: Yup.number().required("Amount is Required").positive().integer(),
  account_number: Yup.string().required("Account Number is Required"),
});

const TransferMoney = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    transfer_success,
    isError,
    current_account,
    message,
    transfer_modal,
  } = useSelector((state) => state.account);
  const id = current_account?._id;
  const handleSubmit = ({ amount, account_number }) => {
    dispatch(transferMoney({ id, amount, account_number }));
  };

  useEffect(() => {
    if (transfer_success) {
      dispatch(setTransferModal(false));
      Alert.alert("Success", "Money Transfered Successfully");
    }
  }, [transfer_success]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={transfer_modal}
        onRequestClose={() => {
          dispatch(setTransferModal(false));
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            dispatch(setTransferModal(false));
          }}
        >
          <View style={styles.modal}>
            <ScrollView>
              <View>
                <ActivityIndicator visible={isLoading} />
                <AppText>Transfer Money</AppText>
                <Form
                  initialValues={{ amount: 0, account_number: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={transferMoneySchema}
                >
                  <FormField
                    name="amount"
                    placeholder="Amount"
                    keyboardType="numeric"
                    textContentType="numeric"
                  />
                  <FormField
                    name="account_number"
                    placeholder="Account Number"
                    keyboardType="numeric"
                    textContentType="numeric"
                  />
                  <AccountPicker />
                  <SubmitButton title="Transfer Money" />
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

export default TransferMoney;

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
