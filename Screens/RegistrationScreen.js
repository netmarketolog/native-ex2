import React, { useState } from "react";

import {
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  return (
    <ImageBackground
      source={require("../img/photoBG.png")}
      style={styles.image}
    >
      <View
        style={{
          ...styles.wrapper,
          height: isShowKeyboard ? "82%" : "67%",
        }}
      >
        <View
          style={{
            ...styles.formContainer,
            marginBottom: isShowKeyboard ? 32 : 78,
          }}
        >
          <View>
            <Text style={styles.formTitle}>Registration</Text>
            <View>
              <View>
                <TextInput
                  value={login}
                  onChangeText={loginHandler}
                  placeholder="Login"
                  style={styles.input}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  style={styles.input}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
              </View>
            </View>
          </View>
          {/* {isShowKeyboard ? (
              ""
            ) : ( */}
          <View>
            <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
              <Text style={styles.btnText}>Registration</Text>
            </TouchableOpacity>
            <Text style={styles.textLink}>
              Do you already have an account? Log-in?
            </Text>
          </View>
          {/* )} */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    width: "100%",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 32,
  },
  formTitle: {
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },

  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  textLink: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
