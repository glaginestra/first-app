import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from './src/store/authStore';
import { View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Tabs from './src/screens/Tabs';
import AddNewProduct from './src/screens/AddNewProduct';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import EditScreen from './src/screens/EditScreen';

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const isLogged = useAuthStore((state) => state.isLogged);
  const login= useAuthStore((state) => state.login);

  useEffect(() => {

    const checkLogin = async () =>{
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const token = await SecureStore.getItemAsync('userToken');
      
      if (token) {
        const token_decodificado = jwtDecode(token);
        login(token_decodificado.usuario);
        console.log(token_decodificado);
        setIsLoading(false);
        
      } else{
        login(null);
        setIsLoading(false);
      }
    }
    checkLogin();
  }, [])


  return (
    <SafeAreaProvider>
      <View style={{flex:1}}>
        <NavigationContainer>
          {isLoading ? (<ImageBackground source={require('./assets/splash-fondo.jpg')} style={{flex:1}}></ImageBackground>) : 
          (<Stack.Navigator initialRouteName={isLogged ? "Tabs" : "Login"} screenOptions={{headerShown: false, animation:'none'}}>
            <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='Register' component={RegisterScreen}></Stack.Screen>
            <Stack.Screen name='Tabs' component={Tabs}></Stack.Screen>
            <Stack.Screen name='EditProfile' component={EditScreen}></Stack.Screen>
            <Stack.Screen name='AddNewProduct' component={AddNewProduct}></Stack.Screen>
          </Stack.Navigator>) 
          }
        </NavigationContainer>
        <Toast
          config={{
            custom_toast: (props) => (
              <BaseToast
                {...props}
                style={{ borderLeftColor: '#4CAF50', height: 80, backgroundColor:'#e6fde6'}}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333'
                }}
                text2Style={{
                  fontSize: 14,
                  color: '#666'
                }}
              />
            ),
            custom_error: (props) => (
              <ErrorToast
                {...props}
                style={{ borderLeftColor: '#ff0000', height: 80, borderRadius: 10, backgroundColor:'#ffe2e2' }}
                text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}
                text2Style={{ fontSize: 14, color: '#444' }}
              />
            ),
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}