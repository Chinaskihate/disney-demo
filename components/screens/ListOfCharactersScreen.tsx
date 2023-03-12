import {StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground} from "react-native";
import {useSelector} from "react-redux";
import { RootState} from "../../store";
import {Character} from "../../models/Character";
import {useNavigation} from "@react-navigation/native";
import {setSelectedCharacter} from "../../store/action-creators";
import {LinearGradient} from "expo-linear-gradient";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

const ListOfCharactersScreen = () => {
        const navigation = useNavigation<any>();
        const selectedList = useSelector((state: RootState) => state.selectedList);
        const lists = useSelector((state: RootState) => state.userLists);
        const data = lists?.filter(l => l.listName === selectedList)[0];
        console.log(data);

        const getImageSource = (char: Character) => {
            return char.imageUrl
                ? {uri: char.imageUrl}
                : require("../../assets/icon.png")
        };

        const openCharacter = (char: Character) => {
            setSelectedCharacter(char);
            navigation.navigate("Character");
        }

        return (
            <BottomSheetModalProvider>
                <ImageBackground style={styles.container}
                                 source={{uri: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8&w=1000&q=80"}}>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.container}>
                        <FlatList style={{height: "90%"}} data={data!.characters} renderItem={
                                    ({item}) =>
                                        <TouchableOpacity onPress={() => openCharacter(item)}>
                                            <Image style={{width: 140, height: 100}} source={getImageSource(item)}/>
                                        </TouchableOpacity>
                                } numColumns={3}/>
                    </LinearGradient>
                </ImageBackground>
            </BottomSheetModalProvider>
        );
    }
;

export default ListOfCharactersScreen;

const styles = StyleSheet.create({
    "container": {
        height: "100%",
        width: "100%"
    },
    "image": {},
    "notFound": {
        fontSize: 30
    },
    "listButton": {
        backgroundColor: "#693511",
        position: "absolute",
        marginLeft: "80%",
        marginTop: "10%",
        padding: 0,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});