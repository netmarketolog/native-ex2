import { createStackNavigator } from '@react-navigation/stack';
import { CommentsScreen } from './CommentsScreen';
import { PostsScreen } from './PostsScreen';
import { MapScreen } from './MapScreen';

const PostsStack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <PostsStack.Navigator initialRouteName="PostsScreen">
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <PostsStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </PostsStack.Navigator>
  );
};
