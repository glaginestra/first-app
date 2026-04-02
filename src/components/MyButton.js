import { Text, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";


export default function MyButton({title, onPress, style, children}) {
    return (
        <Pressable style={style} onPress={onPress}>
            {children}
        </Pressable>
    )
}