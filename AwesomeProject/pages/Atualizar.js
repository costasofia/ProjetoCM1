import React, { Component, useState, useEffect, useContext} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { LocalizationContext } from './../services/localization/LocalizationContext';
import Realm from 'realm';
let realm;

function Atualizar({ route, navigation }) {
    const { id, assunto, descricao } = route.params;

    const [assunto1, setAssunto1] = useState(assunto);
    const [descricao1, setDescricao1] = useState(descricao);
    const { translations } = useContext(LocalizationContext);
    function atualizar() {
        if (assunto1 && descricao1) {
            realm = new Realm({ path: 'notas.realm' });

            realm.write(() => {
                var obj = realm
                    .objects('nota')
                    .filtered('id =' + id);
                if (obj.length > 0) {
                    obj[0].assunto = assunto1
                    obj[0].descricao = descricao1
                    Alert.alert(
                        translations.Info,
                        translations.Registo,
                        [
                            {
                                text:translations.ok,
                                onPress: () =>
                                    navigation.dispatch(StackActions.popToTop())
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    alert(translations.Falha);
                }
            });
        }
    }

    return (
        <View style={styles.MainContainer}>
            <TextInput
                placeholder={translations.InserirA}
                style={styles.TextStyle}
                underlineColorAndroid="transparent"
                onChangeText={text => setAssunto1(text)}
            >{assunto1}</TextInput>
            <TextInput
                placeholder={translations.InserirD}
                style={styles.TextStyle}
                underlineColorAndroid="transparent"
                onChangeText={text => setDescricao1(text)}
            >{descricao1}</TextInput>
            <TouchableOpacity onPress={atualizar} style={styles.button} >
                <Text>{translations.AtualizarN}</Text>
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: "#ededde",
    },
    TextStyle:
    {
        borderWidth: 1,
        marginTop: 20,
        margin: 10,
        borderColor: '#ffbf00',
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 2,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#ffbf00",
        padding: 10,
        borderRadius: 4,
        margin: 10,
        height: 40
    },
});
export default Atualizar;
