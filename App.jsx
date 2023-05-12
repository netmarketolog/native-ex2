import 'react-native-gesture-handler';
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { StatusBar } from 'expo-status-bar'
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(null);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
      <StatusBar style = "auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
