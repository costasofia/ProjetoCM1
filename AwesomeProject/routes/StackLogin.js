
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from './../pages/Login';
import StackLista from './StackLista';
import StackMapa from './StackMapa';


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
                <Stack.Screen name="StackMapa" component={StackMapa}
                    options={{ headerShown: false, }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackLogin; 