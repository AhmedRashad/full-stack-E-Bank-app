import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

import NewAccount from "../screens/NewAccount";
import AccountDetails from "../screens/AccountDetails";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="AddNewAccount" component={NewAccount} />
    <Stack.Screen name="AccountDetails" component={AccountDetails} />
  </Stack.Navigator>
);

export default FeedNavigator;
