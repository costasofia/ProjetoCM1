import React, { Component, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Platform, View, Button, TouchableWithoutFeedback, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, FlatList } from 'react-native';

import Realm from 'realm';

const realm = new Realm({
    path: 'notas.realm',
    schema: [{
        name: 'nota',
        properties: {
            id: { type: 'int', default: 0 },
            assunto: 'string',
            descricao: 'string',
        }
    }]
});

const query = () => realm.objects('nota');

function getupdateddata(query) {
    const [data, setData] = useState(query());

    useEffect(
        () => {
            function handleChange(newData) {
                setData([...newData]);
            }
            const dataQuery = query();
            dataQuery.addListener(handleChange);
            return () => {
                dataQuery.removeAllListeners();
            };
        },
        [query]
    );
    return data;
}

function actionOnRow(item, navigation) {
    navigation.navigate('Detalhes', item);
 }
function Listagem({ navigation }) {
    const notas = getupdateddata(query);
    return (
        <View style={styles.MainContainer}>
            <FlatList
                data={notas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => actionOnRow(item, navigation)}>
                        <View style={styles.linha}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.textprim}>{item.assunto}</Text>
                                <Text style={styles.textsec}>{item.descricao}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    MainContainer :{
        backgroundColor: "#ededde",
       flex:1,
       justifyContent: 'center',
       paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
       margin: 10
    },
    textprim:
     {
       fontWeight: "bold",
       fontSize: 22,
     },
     textsec:
      {
        fontSize: 16,
      
      },
   
     linha: {
       backgroundColor: '#ffbf00',
       margin: 2,
       flex: 1,
       padding: 5,
       flexDirection: 'row',
     }
   });
export default Listagem;