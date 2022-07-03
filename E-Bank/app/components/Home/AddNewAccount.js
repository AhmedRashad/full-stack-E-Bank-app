import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Button";
import Container from "../Container";

const AddNewAccount = ({ onPress }) => {
  return (
    <Container>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Add New Account"
          color="dark"
          onPress={onPress}
        />
      </View>
    </Container>
  );
};

export default AddNewAccount;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    width: "90%",
    marginVertical: 20,
  },
});
