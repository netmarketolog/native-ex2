import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { db } from '../../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from '@reduxjs/toolkit';

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, photoUrl } = route.params;
  const user = useSelector(selectUser);

  const createComment = async () => {
    try {
      const id = nanoid();
      const newComment = {
        userName: user.login,
        comment,
        date: new Date(),
        userId: user.userId,
        id,
      };
      await setDoc(doc(db, 'posts', postId, 'comments', id), newComment);
      setAllComments([...allComments, newComment]);
      setComment('');
      Keyboard.dismiss();
    } catch (error) {
      console.log('Error adding comment: ', error.message);
    }
  };

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
          <Image style={styles.photo} source={{ uri: photoUrl }} />
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
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            onPress={createComment}
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Image source={require('../../../img/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
