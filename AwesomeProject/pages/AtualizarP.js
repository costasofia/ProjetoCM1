import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';

function AtualizarP({ route, navigation }) {

  const { translations } = useContext(LocalizationContext);
  const parametro = route.params.IdUtilizador;
  const { IdUtilizador, IdPonto, Tema, Descricao } = route.params;
  const [ponto, setPonto] = useState([]);
  const [Tema1, setTema1] = useState(Tema);
  const [Descricao1, setDescricao1] = useState(Descricao);

  function updatePontos() {
    return axios.post('http://192.168.1.67:5000/ponto/updatepontos/' + IdPonto, {
      Tema: Tema1,
      Descricao: Descricao1
    }).then(response => {
      console.log(response.data);
      //  navigation.dispach(StackActions.replace('Mapa', {IdPonto: IdPonto, IdUtilizador:IdUtilizador, Tema:Tema, Descricao:Descricao}))
      navigation.navigate('Maps', { IdPonto: IdPonto, IdUtilizador: IdUtilizador, Tema: Tema })
    }).catch(error => {
      console.log(error);
    }, []);

  }

  function updatePonto() {
    if (Tema1.trim() === '' || Descricao1.trim() === '') {
      Alert.alert('Preencha todos os campos');
    } else {
      updatePontos();
    }
  }
  // 
  return (
    <View style={styles.MainContainer}>
      <TextInput
        placeholder={translations.InserirA}
        style={styles.TextStyle}
        underlineColorAndroid="transparent"
        onChangeText={text => setTema1(text)}
      >{Tema1}</TextInput>
      <TextInput
        placeholder={translations.InserirD}
        style={styles.TextStyle}
        underlineColorAndroid="transparent"
        onChangeText={text => setDescricao1(text)}
      >{Descricao1}</TextInput>
      <TouchableOpacity onPress={updatePonto} style={styles.button} >
        <Text>{translations.AtualizarP}</Text>
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
    borderColor: '#000',
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    margin: 10,
    height: 40
  },
});

export default AtualizarP;

