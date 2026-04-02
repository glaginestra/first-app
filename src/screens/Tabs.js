import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import MenuScreen from "./MenuScreen";
import EditScreen from "./EditScreen";
import { globalStyles } from "../styles/globalStyles";


export default function Tabs(){
    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false, tabBarStyle:{paddingTop:10,height:100}, tabBarActiveTintColor:'black', tabBarInactiveTintColor:'#767676', tabBarLabelStyle:{fontSize:15, fontWeight:700, marginTop:5}}}>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{tabBarIcon: ({focused}) =>(<Image source={focused ? require('../../assets/Iconos/usuario-black.png') : require('../../assets/Iconos/usuario-gris.png')} style={globalStyles.icon_nav}></Image>), tabBarLabel:'Perfil'}}></Tab.Screen>
            <Tab.Screen name='Home' component={HomeScreen} options={{tabBarIcon: ({focused}) =>(<Image source={focused ? require('../../assets/Iconos/home-negro.png') : require('../../assets/Iconos/home-gris.png')} style={globalStyles.icon_nav}></Image>)}}></Tab.Screen>
            <Tab.Screen name='Menu' component={MenuScreen} options={{tabBarIcon: ({focused}) =>(<Image source={focused ? require('../../assets/cafe-negro.png') : require('../../assets/cafe-gris.png')} style={globalStyles.icon_nav}></Image>)}}></Tab.Screen>
        </Tab.Navigator>
    )
}