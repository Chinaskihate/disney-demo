import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {ApiClient} from "../../utils/apiClient";
import {useEffect, useState} from "react";
import Pagination from "../pagination/Pagination";
import {Character} from "../../models/Character";
import {useNavigation} from "@react-navigation/native";
import {GetAllResponse} from "../../utils/responses/getAllResponse";
import {setSelectedCharacter} from "../../store/action-creators";
import {bindActionCreators} from "redux";
import {GetByNameResponse} from "../../utils/responses/getByNameResponse";
import {LinearGradient} from "expo-linear-gradient";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import ListButton from "../buttons/ListButton";

const MainScreen = () => {
        const dispatch = useDispatch();
        const pageNumber = useSelector((state: RootState) => state.pageNumber);
        const searchParams = useSelector((state: RootState) => state.searchCharacter);
        const {setSelectedCharacter, stopSearchCharacterByName} = bindActionCreators(actionCreators, dispatch);
        const [allResponse, setAllResponse] = useState<GetAllResponse>({
            data: [],
            count: 0,
            previousPage: '',
            nextPage: '',
            totalPages: 0
        });
        const [byNameResponse, setByNameResponse] = useState<GetByNameResponse>({
            data: [],
            count: 0
        });
        const navigation = useNavigation<any>();
        useEffect(() => {
                const fetchData = async () => {
                    const client = new ApiClient();
                    if (searchParams.name == "") {
                        const response = await client.searchAllAsync(pageNumber);
                        setAllResponse(response);
                    } else if (!searchParams.isSearched) {
                        const response = await client.searchCharacterAsync(searchParams!.name);
                        setByNameResponse(response);
                        stopSearchCharacterByName();
                    }
                };
                if (searchParams.name != "" && !searchParams.isSearched) {
                    fetchData();
                } else if (allResponse.data.length === 0) {
                    fetchData();
                } else if (allResponse.nextPage && Number(allResponse.nextPage.split('=').at(-1)) != pageNumber + 1) {
                    fetchData();
                } else if (allResponse.previousPage && Number(allResponse.previousPage.split('=').at(-1)) != pageNumber - 1) {
                    fetchData();
                }
            }
        )
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
                    {searchParams.name == ""
                        ? <View>
                            <FlatList style={{height: "90%"}} data={allResponse.data} renderItem={
                                ({item}) =>
                                    <TouchableOpacity onPress={() => openCharacter(item)}>
                                        <Image style={{width: 140, height: 100}} source={getImageSource(item)}/>
                                    </TouchableOpacity>
                            } numColumns={3}/>
                            <Pagination/>
                        </View>
                        : (byNameResponse.count == 0
                            ? <Text style={styles.notFound}>Not found</Text>
                            : <FlatList style={{height: "90%"}} data={byNameResponse.data} renderItem={
                                ({item}) =>
                                    <TouchableOpacity onPress={() => openCharacter(item)}>
                                        <Image style={{width: 140, height: 100}} source={getImageSource(item)}/>
                                    </TouchableOpacity>
                            } numColumns={3}/>)}
                </LinearGradient>
                <View style={styles.listButton}>
                    <TouchableOpacity>
                        <ListButton isCharacterScreen={false}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            </BottomSheetModalProvider>
        );
    }
;

export default MainScreen;

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