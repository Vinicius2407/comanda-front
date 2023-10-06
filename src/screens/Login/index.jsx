import { View, StyleSheet, Image, Input, Button, Text, TextInput} from 'react-native'
import React from 'react'
import {useNavigation } from "@react-navigation/native"



export default function Login(){

  

  const navigation = useNavigation();

  const handleNavLogin = () => {
    navigation.navigate("Home")
  }

  const handleNavCadastro = () => {
    navigation.navigate("Register")
  }


  return (
    <View style={styles.container}>
    
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='Digite seu login'
          style={styles.input}
          
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            placeholder='Senha'
            style={styles.input}
            
          />

        <Button style={styles.button}

          title="Entrar"
          onPress={() => {
            handleNavLogin();
        }}
        >
          Entrar
        </Button>

        <Text style={styles.fazerCadastro}
        
        title="Cadastro"
        onPress={() => {
          handleNavCadastro();
        }}>
          Realizar cadastro
        </Text>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#0000",
        paddingTop: 120,
        paddingBottom: 40,
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
    title: {
      fontSize: 22,
      marginTop: 28,
      marginBottom: 16
    },
    fazerCadastro: {
      color: '#38a69d',
      fontSize: 14,
      marginTop: 28,
      marginBottom: 16,
      textDecorationLine: 'underline'
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
});

