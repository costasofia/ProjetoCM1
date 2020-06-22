import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableOpacity, Alert, Dimensions, } from 'react-native';

import { StackAActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';


const Stack = createStackNavigator();
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

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
                                { text: translations.Continuar, onPress: () => { navigation.navigate('Mapa', {parametro: decoded.IdUtilizador}) } },
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
        <View style={dimensions.window.height > dimensions.window.width ? styles.fullP : styles.fullL}>
            <View style={styles.part1}>
                <Image style={{ width: 150, height: 150 }} source={require('../imagens/localizacao.png')} />
            </View>
            <View style={styles.part2}>
                <TextInput
                    style={styles.textinput}
                    placeholder={translations.Email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textinput}
                    placeholder={translations.Password}
                    onChangeText={text => setPassword(text)}>
                </TextInput>
                <View>
                    <TouchableOpacity onPress={login} style={styles.button2}>
                        <Text style={styles.textStyle}>{translations.BotaoLogin}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('StackLista')} style={styles.button}>
                    <Text style={styles.textStyle}>{translations.BotaoNotas}</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    fullP: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#ededde",
    },
    fullL: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#ededde",
    },
    part1: {
        flex: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    part2: {
        flex: 12,
        justifyContent: 'center',
    },
    part3: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
    },
    buttonview: {
        color: 'black',
        flex: 1,
        margin: 10,
    },
    buttonview1: {
        color: 'black',
        flex: 1,
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 25,
    },
    textinput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 10,
    },
    button: {
        height: 40,
        padding: 10,
        backgroundColor: '#ffbf00',
        borderRadius: 2,
        margin: 10
    },
    button2: {
        height: 40,
        padding: 10,
        backgroundColor: '#ffbf00',
        borderRadius: 2,
        margin: 9
    },
    textStyle: {
        margin: 1,
        borderColor: 'black',
        flex: 1,
        color: 'black',
        textAlign: 'center',
    },
});

export default Login; 