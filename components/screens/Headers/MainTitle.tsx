import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, RootState} from "../../../store";
import {AntDesign} from "@expo/vector-icons";
import {auth} from "../../../config/config";
import {useNavigation} from "@react-navigation/native";

const MainTitle = () => {
    const dispatch = useDispatch();
    const {searchCharacterByName, clearSearchCharacterByName} = bindActionCreators(actionCreators, dispatch);
    const searchCharacterParams = useSelector((state: RootState) => state.searchCharacter);
    const navigation = useNavigation<any>();

    const changeCharName = (char: string) => {
        if (char == "") {
            clearSearchCharacterByName();
        }
        if (char == searchCharacterParams.name && searchCharacterParams.isSearched) {
            return;
        }
        searchCharacterByName(char);
    }

    const logout = () => {
        auth
            .signOut()
            .then(() => {
                console.log("LOGOUT")
            })
            .catch(error => alert(error.message));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.reset({
                    index: 0,
                    routes: [{name: "Login"}]
                });
            }
        })

        return unsubscribe
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Disney</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Character name"
                    placeholderTextColor="#003f5c"
                    onSubmitEditing={(event) => changeCharName(event.nativeEvent.text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => logout()}>
                <AntDesign name="logout" style={buttonStyle}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default MainTitle;

const buttonStyle = {fontSize: 40}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    inputView: {
        borderRadius: 10,
        width: "50%",
        height: "100%",
        marginLeft: "10%",
        alignItems: "center",
        borderColor: "#020000",
        borderWidth: 1
    },
    TextInput: {
        flex: 1,
        width: "100%",
        height: "100%",
        marginLeft: "10%"
    },
    button: {
        marginLeft: "10%"
    }
});