import React, {FC, useCallback, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import NotesSheetModal from "../sheet-modal/NotesSheetModal";
import {BottomSheetModal} from "@gorhom/bottom-sheet";

interface ListButtonProps {
    isCharacterScreen: boolean
}

const ListButton: FC<ListButtonProps> = ({isCharacterScreen}) => {
    const listModalRef = useRef<BottomSheetModal>(null);
    // variables
    const listSnapPoints = useMemo(() => ['25%', '80%'], []);
    // callbacks
    const handlePresentListModalPress = useCallback(() => {
        listModalRef.current?.present();
    }, []);
    const handleListChanges = useCallback(() => {
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={handlePresentListModalPress}>
                <AntDesign name="staro" style={buttonStyle} color="black"/>
            </TouchableOpacity>
            <BottomSheetModal
                backgroundStyle={styles.modal}
                ref={listModalRef}
                index={1}
                snapPoints={listSnapPoints}
                onChange={handleListChanges}
            >
                <NotesSheetModal isCharacterScreen={isCharacterScreen}/>
            </BottomSheetModal>
        </View>);
};

export default ListButton;

const buttonStyle = {fontSize: 50}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#2f0f0f"
    }
});
