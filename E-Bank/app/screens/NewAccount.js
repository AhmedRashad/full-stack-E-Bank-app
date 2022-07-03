import * as Yup from "yup";
import { StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import PickerDate from "../components/forms/PickerDate";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { getUserAccounts } from "../../features/auth/authSlice";
import { addAccount, resetAccount } from "../../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateAccountSchema = Yup.object().shape({
  username: Yup.string().required("Name is Required"),

  email: Yup.string().email().required("Email is Required"),

  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "Must be exactly 11 number")
    .required("Phone is Required"),

  work: Yup.string().required("Current Job is Required"),

  country: Yup.string().required("Country is Required"),

  id_government: Yup.string()
    .matches(/^[0-9]{14}$/, "Must be exactly 14 number")
    .required("Phone is Required"),

  streetAddress: Yup.string().required("Street Address is Required"),

  city: Yup.string().required("City is Required"),

  stateProvince: Yup.string().required("State / Province is Required"),

  zipPostalCode: Yup.string()
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits")
    .required("Zip / Postal Code is Required"),

  birth_date: Yup.date().required("Birth Date is Required"),

  account_name: Yup.string().required("Account Name is Required"),

  current_balance: Yup.number()
    .required("Current Balance is Required")
    .positive()
    .integer()
    .min(1000),
});

const NewAccount = ({ navigation }) => {
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();
  const handleSubmit = ({
    username,
    email,
    phone,
    work,
    country,
    id_government,
    streetAddress,
    city,
    stateProvince,
    zipPostalCode,
    birth_date,
    account_name,
    current_balance,
  }) => {
    dispatch(
      addAccount({
        username,
        email,
        phone,
        work,
        country,
        id_government,
        streetAddress,
        city,
        stateProvince,
        zipPostalCode,
        birth_date,
        account_name,
        current_balance,
      })
    );
  };

  if (isSuccess) {
    Alert.alert("Success", "Account Created Successfully", [
      {
        text: "Home",
        onPress: () => {
          dispatch(resetAccount());
          dispatch(getUserAccounts());
          console.log("isSuccess", isSuccess);
          navigation.navigate("HomeScreen");
        },
      },
      {
        text: "Add Account",
        onPress: () => {
          dispatch(resetAccount());

          dispatch(getUserAccounts());

          navigation.navigate("AddNewAccount");
        },
      },
    ]);
  }
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Screen style={styles.container}>
        <AppText style={styles.text}>Add New Account</AppText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Form
            initialValues={{
              username: "",
              email: "",
              phone: "",
              work: "",
              country: "",
              id_government: "",
              streetAddress: "",
              city: "",
              stateProvince: "",
              zipPostalCode: "",
              birth_date: "",
              account_name: "",
              current_balance: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={CreateAccountSchema}
          >
            <ErrorMessage error={isError} visible={isError} />
            <AppText style={styles.text}>Account Owner Information</AppText>
            <FormField name="username" placeholder="Name" label="Name" />
            <FormField name="email" placeholder="Email" label="Email" />
            <FormField name="phone" placeholder="Phone" label="Phone" />
            <FormField
              name="work"
              placeholder="Current Job"
              label="Current Job"
            />
            <FormField name="country" placeholder="Country" label="Country" />
            <FormField
              name="id_government"
              placeholder="Government ID"
              label="Government ID"
            />
            <FormField
              name="streetAddress"
              placeholder="Street Address"
              label="Street Address"
            />
            <FormField name="city" placeholder="City" label="City" />
            <FormField
              name="stateProvince"
              placeholder="State / Province"
              label="State / Province"
            />
            <FormField
              name="zipPostalCode"
              placeholder="Zip / Postal Code"
              label="Zip / Postal Code"
            />
            <PickerDate name="birth_date" />
            <FormField
              name="account_name"
              placeholder="Account Name"
              label="Account Name"
            />
            <FormField
              name="current_balance"
              placeholder="Current Balance"
              label="Current Balance"
            />
            <SubmitButton title="Add Account" />
          </Form>
        </ScrollView>
      </Screen>
    </>
  );
};

export default NewAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: 360,
    padding: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
