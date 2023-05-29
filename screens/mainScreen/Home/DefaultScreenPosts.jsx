import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import { onSnapshot, collection } from 'firebase/firestore';

import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { logOut } from '../../redux/auth/authOperations';
import { db } from '../../firebase/firebaseConfig';

const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { login, email } = useSelector(selectUser);

  const handleSubmit = () => {
    dispatch(logOut());
  };

  const getAllPosts = async () => {
    try {
      await onSnapshot(collection(db, 'posts'), querySnapshot => {
        const fetchedPosts = [];
        querySnapshot.forEach(doc => {
          fetchedPosts.push(doc.data());
        });
        setPosts(fetchedPosts);
      });
    } catch (error) {
      console.log('Error getting posts:', error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const Item = ({ item }) => {
    const { photoUrl, title, location, locationCoords } = item;
    return (
      <View style={{ marginBottom: 24 }}>
        <Image
          style={{ width: '100%', height: 240, borderRadius: 8 }}
          source={{ uri: photoUrl }}
        />
        <Text
          style={{
            ...styles.contentText,
            fontFamily: 'Roboto-Italic',
            marginVertical: 8,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 24,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('CommentsScreen')}
              >
                <Image
                  style={{ marginRight: 6 }}
                  source={require('../../../img/comment.png')}
                />
              </TouchableOpacity>
              <Text style={styles.contentText}>11</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ marginRight: 6 }}
                source={require('../../../img/like.png')}
              />
              <Text style={styles.contentText}>203</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MapScreen', locationCoords)}
            >
              <Image
                style={{ marginRight: 4 }}
                source={require('../../../img/map-pin.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...styles.contentText,
                textDecorationLine: 'underline',
              }}
            >
              {location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Публикации</Text>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.7}
          onPress={handleSubmit}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 320, marginHorizontal: 16 }}>
        <View style={styles.userWrapper}>
          <Image
            style={styles.userAvatar}
            source={require('../../../img/user.jpg')}
          />
          <View>
            <Text style={styles.userName}>{login}</Text>
            <Text style={styles.userEmail}> {email} </Text>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logout: {
    position: 'absolute',
    right: 10,
    top: 54,
    opacity: 0.2,
  },
  header: {
    width: '100%',
    paddingVertical: 11,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
  },
  screenTitle: {
    fontFamily: 'Roboto-Italic',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
  },
  userWrapper: {
    paddingVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontFamily: 'Roboto-Italic',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});

export default DefaultScreen;
