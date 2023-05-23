import { useState, useEffect } from 'react';

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
  Keyboard,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { logIn } from '../redux/auth/authOperations';

const windowWidth = Dimensions.get('window').width - 16 * 2;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [widthState, setWidthState] = useState(windowWidth);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => setWidthState(windowWidth);
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      () => subscription?.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    if (email !== '' && password !== '') {
      dispatch(logIn({ email, password }));
    } else {
      setIsShowKeyboard(false);
      return alert(
        'Enter your email address and password, and verify that they are entered correctly!'
      );
    }
    reset();
    keyboardHide();
  };

  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);
  const isOpenPasswordHandler = () => setIsOpenPassword(!isOpenPassword);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../img/photoBG.png')}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <View style={styles.wrapper}>
              <View
                style={{
                  marginBottom: isShowKeyboard ? 32 : 144,
                  width: widthState,
                }}
              >
                <Text style={styles.formTitle}>Login</Text>
                <View>
                  <View>
                    <TextInput
                      value={email}
                      onChangeText={emailHandler}
                      placeholder="Email"
                      style={styles.input}
                      onFocus={() => setIsShowKeyboard(true)}
                      onSubmitEditing={handleSubmit}
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
                      onSubmitEditing={handleSubmit}
                    />
                    <Text style={styles.show} onPress={isOpenPasswordHandler}>
                      {isOpenPassword ? 'hide' : 'show'}
                    </Text>
                  </View>
                </View>
                {isShowKeyboard ? (
                  ''
                ) : (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.btn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.btnText}>Sign-in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Registration')}
                    >
                      <Text style={styles.textLink}>
                        Don't have an account?
                        <Text style={{ color: '#FF6C00' }}> Registration?</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
  formTitle: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    fontFamily: 'Roboto-Regular',
  },
  show: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  btn: {
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19,
  },
  textLink: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
