import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Pressable , ImageBackground, Text} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

import Toast from "react-native-toast-message";


export default function AddNewProduct({navigation}){
    const [imagen, setImagen] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.canceled) {
            setImagen(result.assets[0]);
        }
    }; 
    
    const handleAddProduct = async()=>{
        if(titulo.trim() === '' || descripcion.trim() === '' || !imagen){
            setError('Completa los campos vacios.');
            return;
        }

        const formData = new FormData();

        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);

        formData.append('imagen', {
            uri: imagen.uri,
            name: imagen.fileName || `foto-${Date.now()}.jpg`,
            type: imagen.mimeType || 'image/jpeg'
        });

        console.log(imagen);

        const res = await fetch('http://10.0.2.2:3000/producto',{
            method: 'POST',
            body: formData
        })

        const data = await res.json();
        if (data.success){
            console.log('Producto agregado');
            Toast.show({
                type: 'custom_toast',
                text1: 'Perfecto!',
                text2: data.message,
                visibilityTime: 3000,
            });
            navigation.goBack();
        } else{
            Toast.show({
                type: 'custom_error',
                text1: 'Error!',
                text2: data.message,
                visibilityTime: 3000,
            });
        }
    }




    return(
        <SafeAreaView style={{flex:1}} edges={['top']}>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:43, fontWeight:'bold', marginBottom:30}}>Agregar Producto</Text>
                <TextInput  placeholder="Titulo" style={globalStyles.input} onChangeText={setTitulo}/>
                <TextInput  placeholder="Descripcion" style={globalStyles.input} onChangeText={setDescripcion}/>
                {error != '' && <Text style={{color:'red'}}>{error}</Text>}
                <Pressable style={{width:'auto', backgroundColor:'black', paddingHorizontal:30, paddingVertical:10, borderRadius:5}} onPress={pickImage}><Text style={globalStyles.fontButton}>Seleccionar Imagen</Text></Pressable>
                <Pressable style={{width:'auto', backgroundColor:'black', paddingHorizontal:30, paddingVertical:10, borderRadius:5, marginTop:20}} onPress={handleAddProduct}><Text style={globalStyles.fontButton}>Cargar Producto</Text></Pressable>
            </ImageBackground>
        </SafeAreaView>
    )
}