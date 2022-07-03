import React, { useEffect } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

import Screen from "../components/Screen";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().length(11).required("Phone is Required"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const handleSubmit = ({ name, email, phone, password }) => {
    console.log({ name, email, phone, password });
    dispatch(register({ name, email, phone, password }));
  };
  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Screen style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={styles.logo} source={require("../assets/splash.png")} />

          <Form
            initialValues={{ name: "", email: "", phone: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={message} visible={isError} />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="cellphone"
              name="phone"
              placeholder="Phone"
              textContentType="telephoneNumber"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" />
          </Form>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    resizeMode: "contain",
    overflow: "visible",
  },
});

export default RegisterScreen;
