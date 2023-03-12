import {View, Text, StyleSheet, Image, ImageBackground, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Character} from "../../models/Character";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import ListButton from "../buttons/ListButton";
import CommentButton from "../buttons/CommentButton";

const CharacterScreen = () => {
    const selectedCharacter = useSelector((state: RootState) => state.character);

    const getImageSource = (char: Character) => {
        return char.imageUrl
            ? {uri: char.imageUrl}
            : require("../../assets/icon.png")
    };

    return (
        <BottomSheetModalProvider>
            <ImageBackground style={styles.container}
                             source={{uri: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8&w=1000&q=80"}}>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.container}>
                    <Image style={styles.image} source={getImageSource(selectedCharacter!)}/>
                    <View style={styles.buttonsContainer}>
                        <ListButton isCharacterScreen={true}/>
                        <CommentButton/>
                    </View>

                    <ScrollView style={styles.charInfo}>
                        <Text style={styles.text}>Films: {selectedCharacter?.films.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.films.join('\n')}</Text>
                        <Text style={styles.text}>Short films: {selectedCharacter?.shortFilms.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.shortFilms.join('\n')}</Text>
                        <Text style={styles.text}>Tv shows: {selectedCharacter?.tvShows.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.tvShows.join('\n')}</Text>
                        <Text style={styles.text}>Video games: {selectedCharacter?.videoGames.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.videoGames.join('\n')}</Text>
                        <Text style={styles.text}>Park attractions: {selectedCharacter?.parkAttractions.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.parkAttractions.join('\n')}</Text>
                        <Text style={styles.text}>Allies: {selectedCharacter?.allies.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.allies.join('\n')}</Text>
                        <Text style={styles.text}>Enemies: {selectedCharacter?.enemies.length}</Text>
                        <Text style={styles.text}>{selectedCharacter?.enemies.join('\n')}</Text>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </BottomSheetModalProvider>
    );
};

export default CharacterScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        height: "100%",
        width: "100%"
    },
    image: {
        marginLeft: "5%",
        marginTop: "5%",
        width: "70%",
        height: "40%",
        borderRadius: 10
    },
    charInfo: {
        backgroundColor: 'rgba(190,60,18,0.8)',
        width: '90%',
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 10,
        marginLeft: '5%'
    },
    text: {
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    buttonsContainer: {
        position: "absolute",
        flexDirection: "column",
        marginLeft: "80%",
        height: "40%",
        width: "1%",
        padding: 5,
        backgroundColor: 'rgba(190,60,18,0.8)',
        justifyContent: "space-between",
        marginTop: "5%",
        borderRadius: 10,
    },
});