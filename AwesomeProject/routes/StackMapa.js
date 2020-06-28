import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ListagemP from './../pages/ListagemP';
import InserirP from './../pages/InserirP';
import DetalhesP from './../pages/DetalhesP';
import AtualizarP from './../pages/AtualizarP';
import Maps from './../pages/Maps';

import { LocalizationContext } from './../services/localization/LocalizationContext';


const Stack = createStackNavigator();
function StackLogin({ navigation }) {
    const { translations } = useContext(LocalizationContext);
    return (
            <Stack.Navigator initialRouteName="Maps">
                <Stack.Screen name="Maps" component={Maps}
                    options={{ headerShown: false, }} />

                <Stack.Screen name="InserirP" component={InserirP}
                    options={({ navigation }) => ({
                        title: translations.InserirP,
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

                <Stack.Screen name="ListagemP" component={ListagemP}
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


                <Stack.Screen name="DetalhesP" component={DetalhesP}
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

                <Stack.Screen name="AtualizarP" component={AtualizarP}
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


            </Stack.Navigator>
    )
}
export default StackLogin; 