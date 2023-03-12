import {Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, RootState} from "../../store";
import {ApiClient} from "../../utils/apiClient";
import {AntDesign} from "@expo/vector-icons";

const Pagination = () => {
    const dispatch = useDispatch();
    const {goToNextPage, goToPreviousPage} = bindActionCreators(actionCreators, dispatch);
    const [nextPageDisabled, setNextPageDisabled] = useState<boolean>(false);
    const [maxPageNumber, setMaxPageNumber] = useState<number | null>(null);
    const pageNumber = useSelector((state: RootState) => state.pageNumber);
    const [prevPageDisabled, setPrevPageDisabled] = useState<boolean>(pageNumber === 1);
    useEffect(() => {
        if (!maxPageNumber) {
            const fetchData = async () => {
                let client = new ApiClient();
                const data = await client.searchAllAsync(pageNumber);
                setMaxPageNumber(data.totalPages);
            };
            fetchData();
        }
    }, [])

    const prevPageClicked = () => {
        if (pageNumber == 1) {
            return;
        }
        if (pageNumber == 2) {
            setPrevPageDisabled(true);
        }
        setNextPageDisabled(false);
        goToPreviousPage();
    }

    const nextPageClicked = () => {
        if (pageNumber == maxPageNumber) {
            return;
        }
        if (pageNumber == maxPageNumber! - 1) {
            setNextPageDisabled(true);
        }
        setPrevPageDisabled(false);
        goToNextPage();
    }

    return (
        <View style={styles.container}>
            {prevPageDisabled
                ? <TouchableOpacity style={styles.prevButton}/>
                : <TouchableOpacity style={styles.prevButton}
                                    onPress={() => prevPageClicked()}
                                    disabled={prevPageDisabled}>
                    <AntDesign name="caretleft" size={24} color="black" />
                </TouchableOpacity>}
            <Text style={styles.pageNumber}>{pageNumber}</Text>
            {nextPageDisabled
                ? <TouchableOpacity style={styles.nextButton}/>
                : <TouchableOpacity style={styles.nextButton}
                                    onPress={() => nextPageClicked()}
                                    disabled={nextPageDisabled}>
                    <AntDesign name="caretright" size={24} color="black" />
                </TouchableOpacity>}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#945236",
        height: "10%",
        alignSelf: "stretch"
    },
    textParams: {
        fontSize: 30
    },
    pageNumber: {
        fontSize: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    prevButton: {
        width: "40%",
        alignItems: "center",
        justifyContent: "center"
    },
    nextButton: {
        width: "40%",
        alignItems: "center",
        justifyContent: "center"
    }
});