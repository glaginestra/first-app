import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Pressable, View, ImageBackground, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { useState } from "react";

export default function RegisterScreen({navigation}){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const mayuscula = (texto) => {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!nombre.trim() || !apellido.trim() || !usuario.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Todos los campos son obligatorios");
            return;
        }
        const response = await fetch('http://10.0.2.2:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, apellido, usuario, email, password})
        });
        const data = await response.json();
        if (data.success) {
            setError('')
            console.log('Usuario registrado.')
            navigation.navigate('Login');
        } else{
            setError(data.message)
        }
    };


    return(
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex: 1, alignItems: 'center', justifyContent:'flex-start', paddingTop: 50}}>
                <Image source={require('../../assets/pngwing.com.png')} style={globalStyles.logo}></Image>
                <MyInput placeholder={'Nombre'} value={nombre} onChangeText={((nombre) => setNombre(mayuscula(nombre)))}></MyInput>
                <MyInput placeholder={'Apellido'}  value={apellido} onChangeText={(apellido)=> setApellido(mayuscula(apellido))}></MyInput>
                <MyInput placeholder={'Usuario'} value={usuario} onChangeText={(usuario) => setUsuario(usuario.toLowerCase())}></MyInput>
                <MyInput placeholder={'Email'} keyboardType={'email-address'} value={email} onChangeText={(email) => setEmail(email.toLowerCase())}></MyInput>
                <MyInput placeholder={'Contraseña'} secureTextEntry={true} value={password} onChangeText={setPassword}></MyInput>
                <MyInput placeholder={'Confirmar Contraseña'} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}></MyInput>
                <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize: 16}}>Ya tenés cuenta? </Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text Text style={{fontWeight:'bold', fontSize: 16}}>Inicia Sesión</Text>
                    </Pressable>
                </View>
                {error !=='' && <Text style={{color:'red'}}>{error}</Text>}
                <MyButton style={[globalStyles.button, {marginTop: 20}]} onPress={handleRegister}><Text style={globalStyles.fontButton}>Registrar</Text></MyButton>
            </ImageBackground>
        </SafeAreaView>
    )
}