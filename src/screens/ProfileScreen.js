import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";

import MyButton from "../components/MyButton";
import Header from "../components/Header";

export default function ProfileScreen({navigation}) {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [gmail, setGmail] = useState('');
    const [perfil, setPerfil] = useState(null);

    useFocusEffect(
        useCallback(() => {

            const obtenerToken = async () => {
            setLoadingScreen(true);
            const token = await SecureStore.getItemAsync('userToken');

            if(!token){
                navigation.replace('Login');
            } else{
                const token_decoded = jwtDecode(token);
                const id = token_decoded.id;

                const response = await fetch(`http://10.0.2.2:3000/perfil/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                });

                const data = await response.json();

                if (data.success){
                setNombre(data.info.nombre);
                setApellido(data.info.apellido);
                setUsuario(data.info.usuario);
                setGmail(data.info.email);
                setPerfil(data.info);
                } else{
                console.log(data.message);
                }

                setLoadingScreen(false);
            }
            };

            obtenerToken();

        }, [])
    );

    return(
        <SafeAreaView style={{flex:1}} edges={["top"]}>
            <Header></Header>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex:1}}>
                <Text style={globalStyles.title}>Perfil</Text>
                { loadingScreen ? (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <ActivityIndicator size={'large'} color={'black'}></ActivityIndicator>
                    </View>
                    ) :
                    (perfil && (<>
                        <Text style={globalStyles.subtitulo}>Nombre: {nombre} </Text>
                        <Text style={globalStyles.subtitulo}>Apellido: {apellido}</Text>
                        <Text style={globalStyles.subtitulo}>Usuario: {usuario}</Text>
                        <Text style={globalStyles.subtitulo}>Gmail: {gmail}</Text>
                        <MyButton style={globalStyles.button} onPress={() => navigation.navigate('EditProfile')}><Text style={globalStyles.fontButton}>Modificar Datos</Text></MyButton>
                    </>))
                    
                }
            </ImageBackground>
        </SafeAreaView>
    )
}