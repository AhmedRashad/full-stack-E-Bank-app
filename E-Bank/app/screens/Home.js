import { StyleSheet, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAccounts } from "../../features/auth/authSlice";
import {
  setCurrentAccount,
  resetAccount,
} from "../../features/account/accountSlice";
import colors from "../config/colors";
import Screen from "../components/Screen";
import HomeIcons from "../components/Home/HomeIcons";
import AddNewAccount from "../components/Home/AddNewAccount";
import AccountCard from "../components/AccountCard";
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, userAccounts } = useSelector((state) => state.auth);
  const { current_account } = useSelector((state) => state.account);
  useEffect(() => {
    dispatch(getUserAccounts());
    dispatch(resetAccount());
  }, [current_account]);
  return (
    <Screen>
      <Text style={styles.text}>Welcome {user.name}</Text>
      <HomeIcons />
      <AddNewAccount onPress={() => navigation.navigate("AddNewAccount")} />
      <FlatList
        data={userAccounts}
        keyExtractor={(account) => account._id}
        renderItem={({ item }) => (
          <AccountCard
            key={item._id}
            account={item}
            onPress={() => {
              dispatch(setCurrentAccount(item));
              navigation.navigate("AccountDetails");
            }}
          />
        )}
      />
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: colors.primary,
    textAlign: "center",
    marginTop: 50,
  },
});
