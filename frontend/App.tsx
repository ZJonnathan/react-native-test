import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const {Screen, Navigator} = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Register" component={RegisterScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App