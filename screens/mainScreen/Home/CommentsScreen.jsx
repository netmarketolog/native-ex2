import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const CommentsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Comments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DefaultScreen')}>
          <Image
            style={{ position: 'absolute', left: 16, bottom: 0 }}
            source={require('../../../img/arrow-left.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.addPhoto}>
          <Image
            style={styles.photo}
            source={require('../../../img/img.jpg')}
          />
        </View>
        <View style={styles.commetsSection}>
          <View style={styles.commentWrapper}>
            <Image
              style={styles.commentImage}
              source={require('../../../img/bot.png')}
            />
            <View style={styles.textBox}>
              <Text style={{ marginBottom: 8 }}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={styles.commentDate}>09 июня, 2020 | 09:14</Text>
            </View>
          </View>
          <View style={{ ...styles.commentWrapper, flexDirection: 'row' }}>
            <Image
              style={{ ...styles.commentImage, marginRight: 16, marginLeft: 0 }}
              source={require('../../../img/avatar.png')}
            />
            <View
              style={{
                ...styles.textBox,
                borderTopStartRadius: 0,
                borderTopEndRadius: 6,
              }}
            >
              <Text style={{ marginBottom: 8 }}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={{ ...styles.commentDate, textAlign: 'right' }}>
                09 июня, 2020 | 09:14
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <TextInput
            style={styles.footerInput}
            placeholder="Comment..."
            placeholderTextColor="#bdbdbd"
          />
          <Image
            source={require('../../../img/send.png')}
            style={{ position: 'absolute', top: 8, right: 8 }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 11,
    paddingTop: 50,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
  },
  screenTitle: {
    fontFamily: 'Roboto-Italic',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 32,
    height: '100%',
  },
  addPhoto: {
    marginBottom: 32,
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#f6f6f6',
  },
  addPhotoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#bdbdbd',
  },
  commentWrapper: {
    flexDirection: 'row-reverse',
    marginBottom: 24,
  },
  commentImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 16,
  },
  textBox: {
    flex: 1,
    padding: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    borderTopEndRadius: 0,
    color: '#212121',
  },
  commentDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    color: '#bdbdbd',
  },
  cameraBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomColor: '#e8e8e8',
    justifyContent: 'center',
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  button: {
    backgroundColor: '#F6f6f6',
    borderRadius: 25.5,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonTitle: {
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  footerInput: {
    borderRadius: 25,
    backgroundColor: '#f6f6f6',
    height: 50,
    width: '100%',
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#bdbdbd',
  },
});
