import { TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function MyInput({placeholder, value, onChangeText, secureTextEntry}) {
    return(
        <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} style={globalStyles.input}></TextInput>
    )

}