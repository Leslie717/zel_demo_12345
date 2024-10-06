/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homeScreen';
import UserListScreen from './src/screens/userList';
import { ApolloProvider } from '@apollo/client';
import client from './src/config/gql/client';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserList" component={UserListScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


export default App;




