import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from '../Home/PostsScreen';
import CreatePostScreen from '../CreateScreen/CreatePostScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

export const MainTab = createBottomTabNavigator();

export const Default = () => {
  return (
    <MainTab.Navigator initialRouteName={'PostsScreen'}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 82,
                  backgroundColor: focused ? '#FF6C00' : '#ffffff',
                }}
              >
                <Ionicons
                  name="ios-grid-outline"
                  size={size}
                  color={focused ? '#ffffff' : '#bdbdbd'}
                />
              </View>
            );
          },
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: focused ? '#FF6C00' : '#ffffff',
                }}
              >
                <Ionicons
                  name="ios-add"
                  size={size}
                  color={focused ? '#ffffff' : '#bdbdbd'}
                />
              </View>
            );
          },
        }}
        name="CreatePostScreen"
        component={CreatePostScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 82,
                  backgroundColor: focused ? '#FF6C00' : '#ffffff',
                }}
              >
                <Ionicons
                  name="ios-person"
                  size={size}
                  color={focused ? '#ffffff' : '#bdbdbd'}
                />
              </View>
            );
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
