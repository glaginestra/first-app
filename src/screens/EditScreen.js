import { View, Text, ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";

import Toast from "react-native-toast-message";


//Clases creadas mias
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { jwtDecode } from "jwt-decode";
import { globalStyles } from "../styles/globalStyles";


export default function EditScreen({navigation}){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [gmail, setGmail] = useState('');
    const [id, setID] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
      const obtenerToken = async ()=>{
        const token = await SecureStore.getItemAsync('userToken');
        if (token){
            const token_decoded = jwtDecode(token);
            setID(token_decoded.id);
            const id=token_decoded.id;
            const response = await fetch(`http://10.0.2.2:3000/perfil/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json();
            if (data.success){
                setNombre(data.info.nombre);
                setApellido(data.info.apellido);
                setUsuario(data.info.usuario);
                setGmail(data.info.email);
                console.log(data);
            } else{
                console.log(data.message);
            }
        } else{
            navigation.replace('Login');
        }
      };
      obtenerToken();
    }, [])

    const handleUpdate = async ()=>{
        if(nombre.trim()==='' || apellido.trim()==='' || usuario.trim()==='' || gmail.trim()==='' ){
            setError('Completa los campos vacíos.');
            return;
        }

        const response = await fetch('http://10.0.2.2:3000/perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, apellido, usuario, gmail, id})
        });

        const data = await response.json();
        if (data.success){
            setError('');
            Toast.show({
                type: 'custom_toast',
                text1: 'Perfecto!',
                text2:'Datos guardados correctamente.',
                visibilityTime: 3000,
            });
            navigation.goBack();
        } else{
            setError(data.message)
        }
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:40, fontWeight:'bold', marginBottom:30}}>Editar Perfil</Text>
                <MyInput value={nombre} onChangeText={setNombre}></MyInput>
                <MyInput value={apellido} onChangeText={setApellido}></MyInput>
                <MyInput value={usuario} onChangeText={setUsuario}></MyInput>
                <MyInput value={gmail} onChangeText={setGmail}></MyInput>
                {error && <Text style={{color:'red', marginBottom:10}}>{error}</Text>}
                <MyButton style={globalStyles.button} onPress={handleUpdate}><Text style={globalStyles.fontButton}>Confirmar cambios</Text></MyButton>
            </ImageBackground>
        </SafeAreaView>
    )
}