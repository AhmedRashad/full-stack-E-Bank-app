import { StyleSheet, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }) => {
    dispatch(login({ email, password }));
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
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage
              error="Invalid email and/or password."
              visible={isError}
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
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Login" />
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
