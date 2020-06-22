import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';

import Realm from 'realm';
let realm;

function Inserir({ navigation }) {
    const [assunto, setAssunto] = useState('');
    const [descricao, setDescricao] = useState('');
    
    const { translations } = useContext(LocalizationContext);

    function insert() {
        if (assunto && descricao) {
            realm = new Realm({ path: 'notas.realm' });

            const lastRecord = realm.objects("nota").sorted('id', true)[0];
            const highestId = lastRecord == null ? 0 : lastRecord.id;
            const newid = highestId == null ? 1 : highestId + 1;

            realm.write(() => {
                realm.create('nota', {
                    id: newid,
                    assunto: assunto,
                    descricao: descricao,
                });
            });
           navigation.navigate('Listagem'); 
        }
    }

    return (

        <View style={styles.MainContainer}>
            <TextInput
                placeholder={translations.InserirA}
                style={styles.TextStyle}
                underlineColorAndroid="transparent"
                onChangeText={text => setAssunto(text)}
            />
            <TextInput
                placeholder={translations.InserirD}
                style={styles.TextStyle}
                underlineColorAndroid="transparent"
                onChangeText={text => setDescricao(text)}
            />
            <TouchableOpacity onPress={insert} style={styles.button}>
                <Text>{translations.InserirNota}</Text>
            </TouchableOpacity>
        </View>
    
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex:1, 
        backgroundColor: "#ededde",
    }, 
    TextStyle:{
        borderWidth: 1, 
        margin: 10, 
        borderColor: "#ffbf00",
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
        borderRadius: 2,
        margin: 10,
    },
});

export default Inserir; 