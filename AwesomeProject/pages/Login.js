import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableOpacity, Alert, Dimensions, } from 'react-native'
  

import { StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';

import { gyroscope } from "react-native-sensors";

const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
  console.log({ x, y, z, timestamp })
);


const Stack = createStackNavigator();
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const { width: WIDTH } = Dimensions.get('window');

function Login({ navigation }) {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const { translations } = useContext(LocalizationContext);

    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    }
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    function login() {

        if (Email == '' && Password == '') {
            Alert.alert(
                translations.Login,
                translations.EP,
                [
                    { text: translations.Inserir, style: 'cancel' },
                ]
            )
        } else if (Email == '' && Password != '') {
            Alert.alert(
                translations.Login,
                translations.E,
                [
                    { text: translations.Inserir, style: 'cancel' },
                ]
            )
        } else if (Email != '' && Password == '') {
            Alert.alert(
                translations.Login,
                translations.P,
                [
                    { text: translations.Inserir, style: 'cancel' },
                ]
            )
        } else {
            return axios.post("http://192.168.1.67:5000/utilizador/login", {
                Email: Email,
                Password: Password
            })
                .then(function (response) {
                    var token = response.data;
                    var decoded = jwt_decode(token);
                    if (Email == decoded.Email) {
                        Alert.alert(
                            translations.Login,
                            translations.Loginok,
                            [
                                { text: translations.Continuar, onPress: () => { navigation.dispatch(StackActions.replace('StackMapa', { screen: 'Maps', params: { parametro: decoded.IdUtilizador } })) } },
                            ]

                        )
                    } else {
                        Alert.alert(
                            translations.Login,
                            translations.LoginF,
                            [
                                { text: translations.Fechar, style: 'cancel' },
                            ]
                        )
                    }
                }.bind(this))
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <View style={
            dimensions.window.height > dimensions.window.width
                ? styles.backgroundContainer
                : styles.backgroundContainerLand
        }>
            <View
                style={
                    dimensions.window.height > dimensions.window.width
                        ? styles.logoContainer
                        : styles.logoContainerLand
                }>
                <Image style={{ width: 150, height: 150 }} source={require('../imagens/localizacao.png')} />
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={
                            dimensions.window.height > dimensions.window.width
                                ? styles.input
                                : styles.inputLand
                        }
                        placeholder={translations.Email}
                        onChangeText={text => setEmail(text)}>
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={
                            dimensions.window.height > dimensions.window.width
                                ? styles.input
                                : styles.inputLand
                        }
                        secureTextEntry={true}
                        placeholder={translations.Password}
                        onChangeText={text => setPassword(text)}>
                    </TextInput>
                </View>
                <View
                    style={
                        dimensions.window.height > dimensions.window.width
                            ? styles.containerbtns
                            : styles.containerbtnsLand
                    }>
                    <View
                        style={
                            dimensions.window.height > dimensions.window.width
                                ? styles.containerLogin
                                : styles.containerLoginLand
                        }>
                        <TouchableOpacity
                            style={
                                dimensions.window.height > dimensions.window.width
                                    ? styles.btnLogin
                                    : styles.btnLand
                            }
                            onPress={login} >
                            <Text style={styles.textStyle}>{translations.BotaoLogin}</Text>
                        </TouchableOpacity>
                    </View>
                        <View
                        style={
                            dimensions.window.height > dimensions.window.width
                                ? styles.containerLogin
                                : styles.containerLoginLand
                        }>
                        <TouchableOpacity
                            style={
                                dimensions.window.height > dimensions.window.width
                                    ? styles.btnLogin
                                    : styles.btnLand
                            }
                            onPress={() => navigation.navigate('StackLista')} >
                            <Text style={styles.textStyle}>{translations.BotaoNotas}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({


    textStyle: {
        margin: 1,
        borderColor: 'black',
        flex: 1,
        color: 'black',
        textAlign: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 50,
    },
    logoContainerLand: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
        marginLeft: 30,
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 2,
    },
    input: {
        width: WIDTH - 40,
        height: 45,
        borderRadius: 2,
        fontSize: 16,
        //paddingLeft: 45,
        paddingLeft: 10,
      //  backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: '#000',
        marginHorizontal: 2,
    },
    inputLand: {
        width: 400,
        height: 45,
        borderColor: '#000',
        borderRadius: 2,
        fontSize: 16,
        //paddingLeft: 45,
      
       // backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: '#000',
        marginHorizontal: 40,
    },
    containerbtns: {
        margin: 2,
        alignItems: 'center',
    },
    containerbtnsLand: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 25,
    },
    containerLogin: {
        marginTop: 20,
        alignItems: 'center',
    },
    containerLoginLand: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'center',
    },
    btnLogin: {
        padding: 10,
        width: WIDTH - 40,
        height: 40,
        borderRadius: 2,
        backgroundColor: '#ffbf00',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnLand: {
        width: 160,
        padding: 8,
        borderRadius: 2,
        height: 40,
        margin: 16,
        backgroundColor: '#ffbf00',
        justifyContent: 'center',
    },

    btnNotas: {
        padding: 10,
        width: WIDTH - 40,
        height: 40,
        borderRadius: 2,
        backgroundColor: 'rgba(72,61,139, 0.8)',
        justifyContent: 'center',
        marginTop: 20,
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        //flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundContainerLand: {
        flex: 1,
        width: null,
        height: null,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Login; 