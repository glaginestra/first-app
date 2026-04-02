import { View } from "react-native";

export default function ProductoSkeleton(){
    return (
    <> 
      <View style={{height:230, width:'47%', maxWidth:'47%', borderWidth:0.5, paddingHorizontal:10, paddingVertical:20, borderRadius:10, marginBottom:10}}>        
        <View style={{ width: "100%", height: 120, borderRadius: 10 , backgroundColor: "#E0E0E0"}} />       
        <View style={{ width: "80%", height: 15, marginTop: 10 , backgroundColor: "#E0E0E0"}} />        
        <View style={{ width: "40%", height: 15, marginTop: 5 , backgroundColor: "#E0E0E0"}} />
      </View>
    </>
  );
}