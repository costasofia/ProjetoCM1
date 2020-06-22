import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { createStackNavigator } from '@react-navigation/stack';
import Login from './../pages/Login';

const Stack = createStackNavigator();
function StackLogin({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}
                    options={{ headerShown: false, }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackLogin; 