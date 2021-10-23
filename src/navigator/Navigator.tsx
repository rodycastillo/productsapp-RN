import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const Navigator = () => {


  const { status } = useContext( AuthContext )

  if (status === 'checking') return <LoadingScreen />

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
      {
        (status !== 'authenticated')?
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
        :
        <>
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>

      }
    </Stack.Navigator>
  );
}

export default Navigator;