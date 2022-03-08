import React, {useEffect, useState} from 'react';
import {SafeAreaView ,View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({route}) => {
    useEffect(() => {
        console.log('effect');
      }, [route]);

    const routeParam = route.params;

    const navigation = useNavigation();

    const [login, onChangeLogin] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [wrongPassword, setWrongPassword] = React.useState(false);


    const validateLoginAttempt = (credentialsArr, login, password) => {
        let accesGranted = false;
        credentialsArr.forEach(elem => {
            if(login.replace(/ /g,'') == elem['login']){
                console.log('login found')
                if(password.replace(/ /g,'') == elem['password']){
                    navigation.navigate('Welcome');
                    accesGranted = true;
                }
            }
        })
        if(!accesGranted){
            Alert.alert('Wrong username or password');
        }
    }

    const buttonIsActive = () => {
        if(login.length > 0 && password.length > 0){
            return false;
        }
        else{
            return true;
        }
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                value={login}
                placeholder={`Login`}
                onChangeText={text => onChangeLogin(text)}>
            </TextInput>
            <TextInput
                style={styles.input}
                value={password}
                placeholder={'Password'}
                onChangeText={text => onChangePassword(text)}>
            </TextInput>
            <Button
                onPress={() =>
                    {
                        validateLoginAttempt(routeParam, login, password);
                        if(wrongPassword){
                            Alert.alert('You\'ve entered wrong password!')
                        }
                    }}
                title="Log in"
                disabled={buttonIsActive()}
                />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default LoginScreen;