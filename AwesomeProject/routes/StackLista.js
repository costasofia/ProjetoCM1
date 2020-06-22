import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from '../services/localization/LocalizationContext';
import Listagem from './../pages/Listagem';
import Inserir from './../pages/Inserir';
import Atualizar from './../pages/Atualizar';
import Detalhes from './../pages/Detalhes';
import Eliminar from './../pages/Eliminar';
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
       <Stack.Screen name="Detalhes" component={Detalhes}
        options={({ navigation }) => ({
          title: translations.DetalhesN,
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        })}
      />
          <Stack.Screen name="Inserir" component={Inserir}
        options={({ navigation }) => ({
          title: translations.InserirNota,
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
            <Stack.Screen name="Atualizar" component={Atualizar}
        options={({ navigation }) => ({
          title: translations.AtualizarN,
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        })}
      />
           <Stack.Screen name="Eliminar" component={Eliminar}
        options={({ navigation }) => ({
          title: translations.EliminarN,
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        })}
      />

       </Stack.Navigator>

);
}
export default StackLista;