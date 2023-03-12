import {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainStack from "./components/MainStack";

const RootNavigator: FC = () => {
    return (
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
    )
}

export default RootNavigator;