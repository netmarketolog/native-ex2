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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { db } from '../../firebase/firebaseConfig';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { nanoid } from '@reduxjs/toolkit';

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, photoUrl } = route.params;
  const user = useSelector(selectUser);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    if (!comment) return;
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
      keyboardHide();
    } catch (error) {
      console.log('Error adding comment: ', error.message);
    }
  };

  const getAllComments = async () => {
    try {
      await onSnapshot(
        collection(db, 'posts', postId, 'comments'),
        querySnapshot => {
          const fetchedComments = [];
          querySnapshot.forEach(doc => {
            fetchedComments.push(doc.data());
          });
          setAllComments(fetchedComments);
        }
      );
    } catch (error) {
      console.log('Error getting comments:', error.message);
    }
  };

  const Comment = ({ item }) => {
    const { userId, date, comment, userName } = item;
    const commentTime = new Date(date.toDate()).toTimeString().slice(0, 5);
    const day = new Date(date.toDate()).getDate();
    const month = new Date(date.toDate()).getMonth() + 1;
    const year = new Date(date.toDate()).getFullYear();
    const commentDate = `${day}.${month}.${year} | ${commentTime}`;

    return userId === user.userId ? (
      <View style={styles.commentWrapper}>
        <Image
          style={styles.commentImage}
          source={require('../../../img/bot.png')}
        />
        <View style={styles.textBox}>
          <Text style={{ marginBottom: 8 }}>{comment}</Text>
          <Text style={styles.commentDate}>{commentDate}</Text>
        </View>
      </View>
    ) : (
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
          <Text style={{ marginBottom: 8 }}>{comment}</Text>
          <Text style={{ ...styles.commentDate, textAlign: 'right' }}>
            {commentDate}
          </Text>
        </View>
      </View>
    );
  };

  const commentHandler = text => setComment(text);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <View
          style={{
            ...styles.container,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Comments</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DefaultScreen')}
            >
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
            <FlatList
              style={{ marginBottom: 100 }}
              data={allComments}
              renderItem={Comment}
              keyExtractor={item => item.date}
            />
          </View>
          <View style={styles.footer}>
            <View>
              <TextInput
                style={styles.footerInput}
                placeholder="Comment..."
                placeholderTextColor="#bdbdbd"
                value={comment}
                onChangeText={commentHandler}
                onFocus={() => setIsShowKeyboard(true)}
                onSubmitEditing={createComment}
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
