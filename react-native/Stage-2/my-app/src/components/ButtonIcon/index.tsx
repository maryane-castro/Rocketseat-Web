import { Container, Icon, ButtonIconTypesStyleProps } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypesStyleProps;
}

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props){
    return(
        <Container {...rest}>
            <Icon 
            name={icon}
            type={type}
            />
        </Container>
    );

};