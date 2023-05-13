import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log('route.params', route.params);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log('posts', posts);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout}>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    position: 'absolute',
    right: 10,
    top: 54,
    opacity: 0.2,
  },
});
export default PostsScreen;
