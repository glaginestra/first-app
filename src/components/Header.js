import { View, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';


import MyButton from './MyButton';



export default function Header(){
    const navigation = useNavigation();
    return(
        <View style={globalStyles.header}>
            <Image source={require('../../assets/pngwing.com.png')} style={{width:230,height:40}}></Image>
            <MyButton style={globalStyles.perfil} onPress={()=>navigation.navigate('AddNewProduct')}>
                <Image source={require('../../assets/Iconos/usuario-black.png')} style={globalStyles.usuario}></Image>
            </MyButton>
        </View>
    )
}