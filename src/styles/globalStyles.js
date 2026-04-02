import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom:30,
    },
    subtitulo:{
        fontSize:25,
        fontWeight:'bold',
        marginBottom:8
    },
    fontButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    button:{
        width: 200,
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    input:{
        width: 300,
        height: 55,
        backgroundColor: '#fff6ec',
        padding: 10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginBottom: 20,
        paddingLeft:20,
        fontSize: 18,
        borderBottomWidth:3,
    },
    logo:{
        width: 350,
        height: 280,
        marginBottom: -80,
    },
    header:{
        width: '100%',
        height: 80,
        backgroundColor:'#d4b297',
        borderBottomWidth:1,
        borderColor:'#0000001a',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    perfil:{
        width:48,
        height:48,
        backgroundColor:'#fff',
        borderRadius:100,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center'

    },
    usuario:{
        width:22,
        height:22,
        zIndex:10,
    },
    bottomNav: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    container_icon_bottomnav:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        height:53
    },
    font_nav:{
        fontSize:15,
        fontWeight:'700',
    },
    icon_nav:{
        width:32,
        height:32
    }
})