import React, { useContext } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LocalizationContext} from './../services/localization/LocalizationContext';

import Realm from 'realm';
let realm ;

function Detalhes({ route, navigation }) {


    const { id, assunto, descricao} = route.params;
    const { translations } = useContext(LocalizationContext);
    function updateData(){
      navigation.navigate('Atualizar', {
           id: id,
           assunto: assunto,
           descricao: descricao,
          
         });
    }
      function deleteData(){
        navigation.navigate('Eliminar', {
          id: id,
          assunto: assunto,
          descricao: descricao,

        });
      }

      return (
        <View style={styles.MainContainer}>
          <View style={styles.MainContainer}>
              <Text style = { styles.TextInputStyle }>{assunto}</Text>
              <Text style = { styles.TextInputStyle }>{descricao}</Text>
          </View>
         
              <TouchableOpacity onPress={updateData} style={styles.button1} >
                 <Text>{translations.AtualizarN}</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={deleteData} style={styles.button2} >
                  <Text>{translations.EliminarN}</Text>
              </TouchableOpacity>
          
        </View>
      );
    }

    const styles = StyleSheet.create({
        MainContainer: {
            backgroundColor: "#ededde",
          flex: 1,
        },
  
        TextInputStyle:
        {
          borderWidth: 1,
          marginTop: 20,
          padding: 10,
          margin: 10,
          borderColor: '#ffbf00',
          height: 40,
          borderRadius: 2,
          marginBottom: 10,
          textAlign: 'center',
        },
        button1: {
          alignItems: "center",
          backgroundColor: "#ffbf00",
          padding: 10,
          borderRadius: 4,
          margin: 10,
          height: 40
        },
        button2: {
          alignItems: "center",
          backgroundColor: "#ffbf00",
          padding: 10,
          borderRadius: 4,
          margin: 10,
          height: 40
        },
      });
     
      export default Detalhes; 