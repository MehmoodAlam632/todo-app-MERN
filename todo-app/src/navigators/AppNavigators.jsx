import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/auth/LoginScreen';
import SignupScreen from '../Screens/auth/SignupScreen';
import ForgotPasswordScreen from '../Screens/auth/ForgotPasswordScreen';
import OTPCodeScreen from '../Screens/auth/OTPCodeScreen';
import CreatePasswordScreen from '../Screens/auth/CreatePasswordScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddTodoScreen from '../Screens/AddTodoScreen';

const Stack = createNativeStackNavigator();

const AppNavigators = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OTPCode"
                component={OTPCodeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CreatePassword"
                component={CreatePasswordScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddTodo"
                component={AddTodoScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigators

const styles = StyleSheet.create({})