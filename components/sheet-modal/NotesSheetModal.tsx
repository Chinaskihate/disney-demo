import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState, actionCreators} from "../../store";
import {AntDesign} from "@expo/vector-icons";
import {bindActionCreators} from "redux";
import {UserListParams} from "../../store/reducers/userListsReducer";
import {useNavigation} from "@react-navigation/native";

interface NotesProps {
    isCharacterScreen: boolean;
}

const NotesSheetModal: FC<NotesProps> = ({isCharacterScreen}) => {
    const userList = useSelector((state: RootState) => state.userLists);
    const selectedCharacter = useSelector((state: RootState) => state.character);
    const dispatch = useDispatch();
    const [newList, setNewList] = useState<string>('');
    const navigation = useNavigation<any>();
    const {
        addCharacterToList,
        removeCharacterFromList,
        addList,
        removeList,
        selectList
    } = bindActionCreators(actionCreators, dispatch);

    const addCharacterToListWrapper = (listName: string) => {
        addCharacterToList({
            listName: listName,
            character: selectedCharacter
        } as UserListParams);
    }

    const removeCharacterFromListWrapper = (listName: string) => {
        removeCharacterFromList({
            listName: listName,
            character: selectedCharacter
        } as UserListParams);
    }

    const openList = (listName: string) => {
        selectList(listName);
        navigation.navigate("ListOfCharacters");
    }

    const addListWrapper = () => {
        addList(newList);
        setNewList("");
    }

    const removeListWrapper = (listName: string) => {
        removeList(listName);
    }

    return (
        <View>
            {isCharacterScreen
                ? <View/>
                : <View style={styles.inputSection}>
                    <TextInput style={styles.textInput} value={newList}
                               onChangeText={(text) => setNewList(text)}/>
                    <TouchableOpacity style={styles.addListButton}
                                      onPress={() => addListWrapper()}>
                        <AntDesign name="pluscircleo" style={buttonStyle} color="black"/>
                    </TouchableOpacity>
                </View>}
            <FlatList style={{height: "90%"}} data={userList} renderItem={
                ({item}) =>
                    <View style={styles.userList}>
                        <Text style={styles.text}>{item.listName}</Text>
                        {isCharacterScreen
                            ?
                            item.characters.filter(c => c._id === selectedCharacter?._id).length === 0
                                ? <TouchableOpacity style={styles.button}
                                                    onPress={() => addCharacterToListWrapper(item.listName)}>
                                    <AntDesign name="pluscircleo" style={buttonStyle} color="black"/>
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.button}
                                                    onPress={() => removeCharacterFromListWrapper(item.listName)}>
                                    <AntDesign name="minuscircleo" style={buttonStyle} color="black"/>
                                </TouchableOpacity>
                            :
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.openListButton}
                                                  onPress={() => openList(item.listName)}>
                                    <AntDesign name="arrowsalt" style={buttonStyle} color="black"/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => removeListWrapper(item.listName)}>
                                    <AntDesign name="minuscircleo" style={buttonStyle} color="black"/>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
            } numColumns={1}/>
        </View>);
};

export default NotesSheetModal;

const buttonStyle = {fontSize: 40}

const styles = StyleSheet.create({
    "userList": {
        backgroundColor: "#7a4b1d",
        margin: "3%",
        borderRadius: 20,
        padding: "5%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    "text": {
        fontSize: 30,
        width: "70%"
    },
    "button": {
        justifyContent: "center"
    },
    textInput: {
        backgroundColor: "#524c4c",
        borderRadius: 15,
        fontSize: 30,
        height: "100%",
        width: "100%",
        padding: "2%"
    },
    inputSection: {
        height: "10%",
        margin: "3%",
    },
    "addListButton": {
        position: "absolute",
        marginLeft: "80%",
        marginTop: "3%",
        padding: 0,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    "openListButton": {
        marginRight: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
});