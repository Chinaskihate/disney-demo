import {StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import app screens
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";
import CharacterScreen from "./screens/CharacterScreen";
import MainTitle from "./screens/Headers/MainTitle";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import ListOfCharactersScreen from "./screens/ListOfCharactersScreen";

const Stack = createNativeStackNavigator();

const headerStyle = {
    backgroundColor: "rgba(190,60,18,0.8)"
};

const MainStack = () => {
    const selectedCharacter = useSelector((state: RootState) => state.character);
    const selectedList = useSelector((state: RootState) => state.selectedList);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerStyle: headerStyle}}/>
            <Stack.Screen name="Main" component={MainScreen}
                          options={{
                              headerBackVisible: false,
                              headerTitle: () => <MainTitle/>,
                              headerStyle: headerStyle
                          }}/>
            <Stack.Screen name="ListOfCharacters" component={ListOfCharactersScreen}
                          options={{
                              headerTitle: selectedList!,
                              headerStyle: headerStyle
                          }}/>
            <Stack.Screen name="Character" component={CharacterScreen}
                          options={{headerStyle: headerStyle, headerTitle: selectedCharacter?.name}}/>
        </Stack.Navigator>
    );
};

export default MainStack;