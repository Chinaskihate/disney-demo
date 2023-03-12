import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {bindActionCreators} from "redux";
import {AntDesign} from "@expo/vector-icons";
import {CommentParams} from "../../store/reducers/commentsReducer";

const CommentSheetModal = () => {
    const id = useSelector((state: RootState) => state.character?._id);
    const dispatch = useDispatch();
    const {comment} = bindActionCreators(actionCreators, dispatch);
    const [text, setText] = useState<string>('');
    const commentData = useSelector((state: RootState) => state.comments);

    useEffect(() => {
        const filtered = commentData.filter(d => d.id === id);
        if (filtered.length !== 0) {
            setText(filtered[0].data);
        }
    }, [])

    return (
        <View>
            <TextInput style={styles.textInput} multiline={true}
                       value={text}
                       placeholder="Comment..."
                       onChangeText={(newText) => {
                           setText(newText);
                       }}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => {
                    console.log('COMMENT MODAL --- SAVE CLICKED, DATA: ' + text);
                    comment({id: id, data: text} as CommentParams);
                }}>
                    <AntDesign name="save" style={buttonStyle} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setText('');
                    console.log('COMMENT MODAL --- CLEAR CLICKED, DATA: ' + '');
                    comment({id: id, data: ''} as CommentParams);
                }}>
                    <AntDesign name="delete" style={buttonStyle} color="black"/>
                </TouchableOpacity>
            </View>
        </View>);
};

export default CommentSheetModal;

const buttonStyle = {fontSize: 50}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#524c4c",
        borderRadius: 15,
        padding: 10,
        fontSize: 30,
        height: "95%",
        marginLeft: "5%",
        width: "90%"
    },
    buttonsContainer: {
        position: "absolute",
        flexDirection: "column",
        marginLeft: "80%",
        height: "40%",
        width: "1%",
    },
});