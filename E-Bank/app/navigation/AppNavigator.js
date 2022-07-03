import axios from "axios";
import { URL } from "../../config";
import storage from "../../features/auth/storage";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import UserScreen from "../screens/UserScreen";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useEffect(() => {
    registerForPushNotifications();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);
  const registerForPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    const user = await storage.getToken();
    const expotoken = {
      expoToken: token,
    };
    const response = await axios.put(URL + "/users/expoPushToken", expotoken, {
      headers: {
        "x-auth-token": user,
      },
    });
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
