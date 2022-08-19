import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Tabs from './src/navigation/tabs';
import {Restaurant} from './src/screens';
import SignUp from './src/screens/SignUp';
import Cart from './src/screens/Cart';
import OrderDelivery from './src/screens/OrderDelivery';
import SignIn from './src/screens/SignIn';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'SignIn'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
