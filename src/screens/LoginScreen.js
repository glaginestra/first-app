import { ImageBackground, Image, Pressable, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";

import Toast from 'react-native-toast-message';

export default function LoginScreen({navigation}){
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!usuario.trim() || !password.trim()) {
            setError('Completa todos los campos.');
            return;
        }
    try {
        console.log("Enviando datos...");

        const response = await fetch('http://10.0.2.2:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario, password})
        });
        const data = await response.json();
        if(data.success){
            const token = data.token;
            const token_decodificado = jwtDecode(token);
            setError('');
            await SecureStore.setItemAsync('userToken', token);
            login(token_decodificado.usuario);
            console.log('Login exitoso');
            navigation.replace('Tabs');
            Toast.show({
                type: 'custom_toast',
                text1: 'Login Correcto!',
                text2: 'Bienvenido al Menú.',
                visibilityTime: 3000,
            });
        } else{
            setError(data.message);
        }

    } catch (err) {
        console.log("ERROR:", err);
        setError("Error de conexión");
    }
};

    return(
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex: 1, alignItems: 'center', justifyContent:'flex-start', paddingTop: 170}}>
                    <Image source={require('../../assets/pngwing.com.png')} style={globalStyles.logo}></Image>
                    <MyInput placeholder={'Usuario'} value={usuario} onChangeText={(usuario) => setUsuario(usuario.toLowerCase())}></MyInput>
                    <MyInput placeholder={'Contraseña'} secureTextEntry={true} value={password} onChangeText={setPassword}></MyInput>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize: 16}}>No tenés cuenta? </Text>
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={{fontWeight:'bold', fontSize: 16}}>Registrate</Text>
                        </Pressable>
                    </View>
                    {error !== '' && <Text style={{color:'red'}} > {error} </Text>}
                    <MyButton style={[globalStyles.button, {marginTop: 20}]} onPress={handleLogin}><Text style={globalStyles.fontButton}>Iniciar Sesión</Text></MyButton>
            </ImageBackground>
        </SafeAreaView>
    )
}