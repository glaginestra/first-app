import { Image, Text, View } from "react-native";


export default function Card({source, title, description}){
    return(
        <View style={{flex:1, height:'auto', width:'47%', maxWidth:'47%', justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor:'#00000053', paddingHorizontal:10, paddingVertical:20, margin:7, borderRadius:10}}>
            <Image source={source} style={{width: 120, height: 120}}></Image>
            <View style={{alignItems:'flex-start', marginTop:10}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>{title}</Text>
                <Text style={{fontSize:14}}>{description}</Text>
            </View>
        </View>
    )
}