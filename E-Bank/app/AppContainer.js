import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import storage from "../features/auth/storage";
import { setUser } from "../features/auth/authSlice";
import { StyleSheet, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";
import OfflineNotice from "./components/OfflineNotice";
import AuthNavigator from "./navigation/AuthNavigator";
import { navigationRef } from "./navigation/rootNavigation";
export default function AppContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const { user } = await storage.getUserInfo();
    if (user) dispatch(setUser(user));
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Load our app's resources and data to memory
        restoreUser();
        // Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const hidesplash = async () => {
      if (isReady) {
        await SplashScreen.hideAsync();
      } else {
        return null;
      }
    };
    hidesplash();
  }, [isReady]);

  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
