import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { createStackNavigator } from '@react-navigation/stack';
import Login from './../pages/Login';
import StackLista from './StackLista';
import Maps from '../pages/Maps';
import ListagemP from './../pages/ListagemP';
const Stack = createStackNavigator();
function StackLogin({ navigation }) {
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
                    options={{ title: 'Lista de Pontos' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackLogin; 