import { Text, Pressable, View, Image , ImageBackground, ActivityIndicator, ScrollView} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "../components/MyButton";
import { useAuthStore } from "../store/authStore";
import * as SecureStore from 'expo-secure-store';

import Header from "../components/Header";



export default function HomeScreen({navigation}){
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () =>{
        const token = await SecureStore.deleteItemAsync('userToken');
        logout();
        navigation.replace('Login');
        console.log('Deslogueado: ', token);
    }
    
    return(
        <SafeAreaView style={{flex:1}} edges={["top"]}>
            <Header></Header>
            <ImageBackground source={require('../../assets/fondo.jpg')} style={{flex:1}} >
                <ScrollView style={{flex:1}}>
                    <View style={{alignItems:'center', flex:1}}>
                        <Text style={[globalStyles.title, {textAlign:'center'}]}>Home</Text>
                        <Pressable onPress={()=>navigation.navigate('Login')}><Text>Login</Text></Pressable>
                        <Pressable onPress={handleLogout} style={{marginTop:20}}><Text>LogOut</Text></Pressable>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}