import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

// import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <RegistrationScreen />

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
