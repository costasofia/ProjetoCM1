
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from './../pages/Login';
import StackLista from './StackLista';
import Maps from '../pages/Maps';
import ListagemP from './../pages/ListagemP';
import InserirP from './../pages/InserirP';
import DetalhesP from './../pages/DetalhesP';
import AtualizarP from './../pages/AtualizarP';

import { LocalizationContext } from './../services/localization/LocalizationContext';


const Stack = createStackNavigator();
function StackLogin({ navigation }) {
    const { translations } = useContext(LocalizationContext);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}
                    options={{ headerShown: false, }} />
                <Stack.Screen name="StackLista" component={StackLista}
                    options={{ title: 'App', headerShown: false, }} />
                <Stack.Screen name="Maps" component={Maps}
                    options={{ headerShown: false, }} />
                <Stack.Screen name="ListagemP" component={ListagemP}
                    options={{ title: translations.ListaP }} />
                <Stack.Screen name="InserirP" component={InserirP}
                    options={{ title:translations.InserirP}} />
                <Stack.Screen name="DetalhesP" component={DetalhesP}
                    options={{ title:translations.DetalhesP }} />
                <Stack.Screen name="AtualizarP" component={AtualizarP}
                    options={{ title:translations.AtualizarP }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackLogin; 