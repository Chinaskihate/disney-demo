import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from "react-native";
import {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {auth} from "../../config/config";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation<any>();

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user?.email)
            })
            .catch(error => alert(error.message));
    }

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Registered in with: ", user?.email)
            })
            .catch(error => alert(error.message));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{name: "Main"}]
                });
            }
        })

        return unsubscribe
    }, [])

    return (
        <ImageBackground style={styles.container}
                         source={{uri: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8&w=1000&q=80"}}>
            <StatusBar style="auto"/>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.container}>
                <View style={styles.loginView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
                    <Text>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerBtn} onPress={() => handleSignUp()}>
                    <Text>REGISTER</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    loginView: {
        borderRadius: 30,
        width: "70%",
        height: "8%",
        // marginLeft: "10%",
        marginTop: "20%",
        alignItems: "center",
        borderColor: "#020000",
        borderWidth: 1,
        backgroundColor: "#ea815e"
    },
    passwordView: {
        borderRadius: 30,
        width: "70%",
        height: "8%",
        // marginLeft: "10%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#020000",
        borderWidth: 1,
        backgroundColor: "#ea815e"
    },
    TextInput: {
        flex: 1,
        width: "100%",
        height: "100%",
        marginLeft: "10%",
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#f15504",
    },
    registerBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#8c7979",
    }
});








