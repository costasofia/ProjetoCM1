import React, { Component, useState, useContext} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import axios from "axios";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';
function InserirP({route, navigation}){

    const { translations } = useContext(LocalizationContext);
    const parametro = route.params.parametro;
    const lat = route.params.lat;
    const long = route.params.long;
    const [Imagem, setImagem]= useState('');
    const [Tema, setTema]= useState('');
    const [Descricao, setDescricao]= useState('');

    function addPonto() {
        if (Tema.trim() === '' || Descricao.trim() === '') {
          Alert.alert('Preencha todos os campos!');
        } else {
          adicionaPonto();
        }
      }
      function adicionaPonto(){
        return axios.post('http://192.168.1.67:5000/ponto/criarPonto',{
            Tema: Tema,
            Descricao: Descricao,
            Imagem: Imagem,
            Latitude: lat,
            Longitude:long,
            IdUtilizador: parametro
        }).then(response =>{
            console.log(response.data);
           navigation.navigate('Maps')
           // navigation.dispach(StackActions.replace('Mapa', {IdPonto: IdPonto, IdUtilizador:IdUtilizador, Tema:Tema, Descricao:Descricao}))
        }).catch(error=>{
            console.log(error);
        },[]);
        
    }
    return(
        <View style={styles.MainContainer}>
        <TextInput
            placeholder={translations.InserirA}
            style={styles.TextStyle}
            underlineColorAndroid="transparent"
            onChangeText={text => setTema(text)}
        >{Tema}</TextInput>
        <TextInput
            placeholder={translations.InserirD}
            style={styles.TextStyle}
            underlineColorAndroid="transparent"
            onChangeText={text => setDescricao(text)}
        >{Descricao}</TextInput>
        <TouchableOpacity onPress={addPonto} style={styles.button} >
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

export default InserirP;