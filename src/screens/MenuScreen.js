import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ImageBackground , ActivityIndicator} from "react-native";

import Header from "../components/Header";
import Card from "../components/Card";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Image, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

import ProductoSkeleton from "../components/ProductsSkeleton";

export default function MenuScreen(){
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);


    useFocusEffect(
        useCallback(()=>{
            const obtenerProductos = async()=>{
                setLoading(true);
                const res = await fetch('http://10.0.2.2:3000/productos');
                const data = await res.json();
                setProductos(data.productos);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            };
            obtenerProductos();
        },[]
    ));

    return(
    <SafeAreaView style={{flex:1}} edges={['top']}>
        <Header></Header>
        
        {loading ? 
        (<>
        <View style={{ width: '40%', height: 50, borderRadius: 10 , backgroundColor: "#E0E0E0", marginLeft:15, marginTop:10}} />   
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: 10
        }}>
    {[1,2,3,4,5,6].map((item) => (
        <ProductoSkeleton key={item} />
    ))}
  </View></>)
        : (
            <>
            <Text style={{fontWeight:'bold', fontSize:40, marginLeft:10, marginTop:10}}>Capsulas</Text>
            <FlatList style={{paddingHorizontal:5}} data={productos} numColumns={2} keyExtractor={(item) => item.id} 
            renderItem={({item}) => <Card source={{uri: item.imagen}} title={item.titulo} description={item.descripcion}></Card>}/>
        
            </>
        )}

    </SafeAreaView>
    )
}
