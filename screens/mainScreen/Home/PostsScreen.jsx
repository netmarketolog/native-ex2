import { createStackNavigator } from '@react-navigation/stack';
import { CommentsScreen } from './CommentsScreen';
import DefaultScreen from './DefaultScreenPosts';
import MapScreen from './MapScreen';

const PostsStack = createStackNavigator();

const PostsScreen = () => {
  return (
    <PostsStack.Navigator initialRouteName="DefaultScreen">
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreen}
      />
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="CommentsScreen"
        component={CommentsScreen}
      />
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="MapScreen"
        component={MapScreen}
      />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
