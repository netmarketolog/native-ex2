import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import { Default } from './screens/mainScreen/Default/Default';

const AuthStack = createStackNavigator();

export const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName={'Login'}>
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
};
