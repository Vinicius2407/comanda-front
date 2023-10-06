import { View, StyleSheet, Image, Input, Button, Text, TextInput} from 'react-native'
<<<<<<< HEAD

import React, { useState } from 'react';
import {useNavigation } from "@react-navigation/native"

import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
=======
import React from 'react'
import {useNavigation } from "@react-navigation/native"

>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1


export default function Register(){

  const navigation = useNavigation();
<<<<<<< HEAD
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 
=======
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1

  const handleNavLogin = () => {
    navigation.navigate("Login")
  }
  return (
<<<<<<< HEAD

=======
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
    <View style={styles.container}>
    
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='Digite seu login'
          style={styles.input}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
<<<<<<< HEAD
            secureTextEntry={!showPassword} 
            value={password}
            placeholder='Senha'
            onChangeText={setPassword}
            onPress={toggleShowPassword}
=======
            placeholder='Senha'
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
            style={styles.input}
          />

          <Text style={styles.title}>Confirme sua senha</Text>
          <TextInput
            placeholder='Confirme sua senha'
<<<<<<< HEAD
           
            style={styles.input}
          />

          <Text style={styles.title}>Atribuicao</Text>
          <TextInput
            placeholder='[1] garcom - [2] cozinha'
            style={styles.input}
          />
        
        

=======
            style={styles.input}
          />

>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
        <Button style={styles.button}

          title="Cadastrar"
          onPress={() => {
            handleNavLogin();
        }}
        >
          Cadastrar
        </Button>

  
    </View>
  )
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
      flex:1,
      backgroundColor: "#0000",
      paddingTop: 80,
      paddingBottom: 40,
      alignItems: "center"

  },
  containerHeader:{
    marginTop: '10%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  },
  title: {
    fontSize: 22,
    marginTop: 28,
    marginBottom: 16
  },
  
  input: {
    height: 40,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    minWidth: 160
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 40,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRegister: {
    marginTop: 40,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  }
=======
    container: {
        flex:1,
        backgroundColor: "#0000",
        paddingTop: 120,
        paddingBottom: 60,
        alignItems: "center",

    },
    containerHeader:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000'
    },
    containerForm: {
      backgroundColor: '#FFF',
      flex:1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
    },
    title: {
      fontSize: 30,
      marginTop: 28,
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16
    },
    button: {
      backgroundColor: '#38a69d',
      width: '100%',
      borderRadius: 4,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonRegister: {
      marginTop: 14,
      alignSelf: 'center'
    },
    registerText: {
      color: '#a1a1a1'
    }
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
});

