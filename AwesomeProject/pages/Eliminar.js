import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';
import Realm from 'realm';
let realm ;

function Eliminar({ route, navigation }) {
    const { id, assunto, descricao} = route.params;
    const { translations } = useContext(LocalizationContext);
  
    function deleteData(){
        Alert.alert(
          translations.Info,
          translations.MsgRemover,
        [
          {text:translations.Nao, 
          onPress: () => console.log('Pedido cancelado'), style: 'cancel'},
          {text:translations.Sim, 
          onPress: () => {deleteUser();}},
        ]
        );
      }
    
      function deleteUser(){
        realm = new Realm({ path: 'notas.realm' });
        realm.write(() => {
          let task = realm.objects('nota').filtered('id = ' + id);
          realm.delete(task);
        });
        navigation.navigate('Listagem');
      }

      return (
        <View style={styles.MainContainer}>
          <View style={styles.MainContainer}>
              <Text style = { styles.TextInputStyle }>{translations.Assunto}: {assunto}</Text>
              <Text style = { styles.TextInputStyle }>{translations.Descricao}: {descricao}</Text>
          </View>
               <TouchableOpacity onPress={deleteData} style={styles.button2} >
                  <Text>{translations.EliminarN}</Text>
              </TouchableOpacity>
          
        </View>
      );
    }

    const styles = StyleSheet.create({
        MainContainer: {
          flex: 1,
          backgroundColor: "#ededde",
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

        button2: {
          alignItems: "center",
          backgroundColor: "#ffbf00",
          padding: 10,
          borderRadius: 4,
          margin: 10,
          height: 40
        },
      });
     
     
      export default Eliminar; 