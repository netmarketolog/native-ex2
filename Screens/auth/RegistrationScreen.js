import React, { useState, useEffect } from "react";

import {
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Keyboard,
} from "react-native";

const windowWidth = Dimensions.get("window").width - 16 * 2;

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [widthState, setWidthState] = useState(windowWidth);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const onChange = () => setWidthState(windowWidth);
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      () => subscription?.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const isOpenPasswordHandler = () => setIsOpenPassword(!isOpenPassword);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../img/photoBG.png")}
            style={styles.image}
          >
            <View style={styles.wrapper}>
              <View
                style={{
                  marginBottom: isShowKeyboard ? 32 : 78,
                  width: widthState,
                }}
              >
                <View style={styles.avaWrapper}>
                  <View style={styles.avatar}>
                    <View style={styles.addPhoto}>
                      <Image source={require("../../img/add.png")} />
                    </View>
                  </View>
                </View>
                <View style={styles}>
                  <Text style={styles.formTitle}>Registration</Text>
                  <View>
                    <View>
                      <TextInput
                        value={login}
                        onChangeText={loginHandler}
                        placeholder="Login"
                        style={styles.input}
                        onFocus={() => setIsShowKeyboard(true)}
                        onSubmitEditing={keyboardHide}
                      />
                    </View>
                    <View style={{ marginTop: 16 }}>
                      <TextInput
                        value={email}
                        onChangeText={emailHandler}
                        placeholder="Email"
                        style={styles.input}
                        onFocus={() => setIsShowKeyboard(true)}
                        onSubmitEditing={keyboardHide}
                      />
                    </View>
                    <View style={{ marginTop: 16 }}>
                      <TextInput
                        value={password}
                        onChangeText={passwordHandler}
                        placeholder="Password"
                        secureTextEntry={!isOpenPassword}
                        style={styles.input}
                        onFocus={() => setIsShowKeyboard(true)}
                        onSubmitEditing={keyboardHide}
                      />
                      <Text style={styles.show} onPress={isOpenPasswordHandler}>
                        {isOpenPassword ? "hide" : "show"}
                      </Text>
                    </View>
                  </View>
                </View>
                {isShowKeyboard ? (
                  ""
                ) : (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.btn}
                      onPress={(keyboardHide, reset)}
                    >
                      <Text style={styles.btnText}>Sign-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.textLink}>
                        Do you already have an account?{" "}
                        <Text style={{ color: "#FF6C00" }}>Log-in?</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // alignItems: "center",
    // backgroundColor: "#fff",
    // width: "100%",
    // height: "67%",

    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
  formTitle: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },
  show: {
    position: "absolute",
    right: 10,
    top: 15,
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

  avaWrapper: {
    position: "absolute",
    top: -60,
    width: "100%",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
  },
  addPhoto: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
  },
});
