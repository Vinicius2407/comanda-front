import { View, StyleSheet, Image, Input, Button, Text, TextInput} from 'react-native'


import React, { useState } from 'react';
import {useNavigation } from "@react-navigation/native"

export default function Register(){

  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 


  const handleNavLogin = () => {
    navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>

        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder='Digite seu nome'
          style={styles.input}
          />

        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='Digite seu login'
          style={styles.input}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            secureTextEntry={!showPassword} 
            value={password}
            placeholder='Senha'
            onChangeText={setPassword}
            onPress={toggleShowPassword}
            style={styles.input}
          />

          <Text style={styles.title}>Confirme sua senha</Text>
          <TextInput
            placeholder='Confirme sua senha'
           
            style={styles.input}
          />

          <Text style={styles.title}>Atribuicao</Text>
          <TextInput
            placeholder='[1] garcom - [2] cozinha'
            style={styles.input}
          />
        
        

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
  container: {
      flex:1,
      backgroundColor: "#0000",
      paddingTop: 40,
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
    fontSize: 18,
    marginTop: 24,
    marginBottom: 14
  },
  
  input: {
    height: 36,
    marginBottom: 10,
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
});

