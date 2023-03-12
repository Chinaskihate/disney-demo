import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import CommentSheetModal from "../sheet-modal/CommentSheetModal";
import {BottomSheetModal} from "@gorhom/bottom-sheet";

const CommentButton = () => {
    const commentModalRef = useRef<BottomSheetModal>(null);
    // variables
    const commentSnapPoints = useMemo(() => ['25%', '80%'], []);
    // callbacks
    const handlePresentCommentModalPress = useCallback(() => {
        commentModalRef.current?.present();
    }, []);
    const handleCommentChanges = useCallback(() => {
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={handlePresentCommentModalPress}>
                <AntDesign name="book" style={buttonStyle} color="black"/>
            </TouchableOpacity>
            <BottomSheetModal
                backgroundStyle={styles.modal}
                ref={commentModalRef}
                index={1}
                snapPoints={commentSnapPoints}
                onChange={handleCommentChanges}
            >
                <CommentSheetModal/>
            </BottomSheetModal>
        </View>);
};

export default CommentButton;

const buttonStyle = {fontSize: 50}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#2f0f0f"
    },
});