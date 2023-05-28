import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logOut());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../img/photoBG.png')}
        style={styles.background}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.logout}
            activeOpacity={0.7}
            onPress={handleSubmit}
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.avaWrapper}>
            <Image
              style={styles.userAvatar}
              source={require('../../../img/user.jpg')}
            />

            <View style={styles.addPhoto}>
              <Image source={require('../../../img/delete.png')} />
            </View>
          </View>
          <Text style={styles.formTitle}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    height: windowHeight - 145,
    width: windowWidth,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
  logout: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  avaWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',

    position: 'absolute',
    top: -60,
    left: (windowWidth - 120) / 2,
  },

  userAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  addPhoto: {
    position: 'absolute',
    right: -18.5,
    bottom: 14,
  },
  formTitle: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});
export default ProfileScreen;
