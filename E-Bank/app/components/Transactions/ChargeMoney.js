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
  chargeMoney,
  setChargeModal,
} from "../../../features/account/accountSlice";
// schema for the form
const chargeMoneySchema = Yup.object().shape({
  amount: Yup.number().required("Amount is Required").positive().integer(),
});

const ChargeMoney = ({ account }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    charge_success,
    isError,
    message,
    current_account,
    charge_modal,
  } = useSelector((state) => state.account);
  const id = current_account?._id;
  const handleSubmit = ({ amount }) => {
    dispatch(chargeMoney({ id, amount }));
  };
  useEffect(() => {
    if (charge_success) {
      dispatch(setChargeModal(false));
      Alert.alert("Success", "Money Charged Successfully");
    }
  }, [charge_success]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={charge_modal}
        onRequestClose={() => {
          dispatch(setChargeModal(false));
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            dispatch(setChargeModal(false));
          }}
        >
          <View style={styles.modal}>
            <ScrollView>
              <View>
                <ActivityIndicator visible={isLoading} />
                <AppText>Withdrawal Money</AppText>
                <Form
                  initialValues={{ amount: 0 }}
                  onSubmit={handleSubmit}
                  validationSchema={chargeMoneySchema}
                >
                  <FormField
                    name="amount"
                    placeholder="Amount"
                    keyboardType="numeric"
                    textContentType="numeric"
                  />
                  <AccountPicker />

                  <SubmitButton title="Withdraw" />
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

export default ChargeMoney;

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
