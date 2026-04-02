import { View, Image, Text , Pressable} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function BottomNav(){
    const navigation = useNavigation();
    const route = useRoute();


    return(
        <View style={[globalStyles.bottomNav]}>
            <Pressable style={globalStyles.container_icon_bottomnav} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../../assets/Iconos/usuario-gris.png')} style={globalStyles.icon_nav}></Image>
                <Text style={route.name === 'Profile' ? [globalStyles.font_nav, {color:'black'}] : [globalStyles.font_nav, {color:'#767676'}]}>Perfil</Text>
            </Pressable>
            <Pressable style={globalStyles.container_icon_bottomnav} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../assets/Iconos/home-gris.png')} style={globalStyles.icon_nav}></Image>
                <Text style={route.name === 'Home' ? [globalStyles.font_nav, {color:'black'}] : [globalStyles.font_nav, {color:'#767676'}]}>Home</Text>
            </Pressable>
            <Pressable style={globalStyles.container_icon_bottomnav} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../../assets/cafe-gris.png')} style={globalStyles.icon_nav}></Image>
                <Text style={route.name === 'Profile' ? [globalStyles.font_nav, {color:'black'}] : [globalStyles.font_nav, {color:'#767676'}]}>Menú</Text>
            </Pressable>
        </View>
    )
}