import React from "react";
import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostScreen/PostsScreen";
import CreatePostScreen from "./screens/mainScreen/PostScreen/CreatePostScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
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
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 82,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="ios-grid-outline"
                  size={size}
                  color={focused ? "#ffffff" : "#bdbdbd"}
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
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="ios-add"
                  size={size}
                  color={focused ? "#ffffff" : "#bdbdbd"}
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
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 82,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="ios-person"
                  size={size}
                  color={focused ? "#ffffff" : "#bdbdbd"}
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
