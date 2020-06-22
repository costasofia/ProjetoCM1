import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from '../services/localization/LocalizationContext';
import Listagem from './../pages/Listagem';

const Stack = createStackNavigator();

function StackLista({ navigation }) {

  const { translations } = useContext(LocalizationContext);
  return (
    <Stack.Navigator initialRouteName="Listagem">
      <Stack.Screen
        name="Listagem"
        component={Listagem}
        options={({ navigation }) => ({
          title: translations.ListaN,
          backgroundColor: "#f1f1da",
          //  headerLeft: null,
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              //  style={styles.button}
              onPress={() => navigation.navigate('Inserir')}>
              <Image style={{ width: 25, height: 25, marginRight: 20 }} source={require('../imagens/edit.png')} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              //  style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Image style={{ width: 30, height: 30, marginLeft: 20 }} source={require('../imagens/saida.png')} />
            </TouchableOpacity>
          ),
        })}
      />
       </Stack.Navigator>

);
}
export default StackLista;