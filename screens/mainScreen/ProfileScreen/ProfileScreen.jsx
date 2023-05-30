import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getMyPosts();
  }, []);

  const getMyPosts = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        where('userId', '==', user.userId)
      );
      const querySnapshot = await getDocs(q);
      const posts = [];
      querySnapshot.forEach(doc => {
        posts.push(doc.data());
      });
      posts.sort((a, b) => b.date.seconds - a.date.seconds);

      setMyPosts(posts);
    } catch (error) {
      console.log('Error getting documents: ', error.massage);
    }
  };

  const Post = ({ item }) => {
    const { id, photoUrl, title, location, locationCoords } = item;
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
                onPress={() =>
                  navigation.navigate('CommentsScreen', {
                    postId: id,
                    photoUrl: photoUrl,
                  })
                }
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
          <FlatList
            data={myPosts}
            renderItem={Post}
            keyExtractor={item => item.id}
          />
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
  contentText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
export default ProfileScreen;
