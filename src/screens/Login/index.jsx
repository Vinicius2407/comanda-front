import { View, StyleSheet, Image, Input, Button, Text, TextInput} from 'react-native'
import React from 'react'
import {useNavigation } from "@react-navigation/native"



export default function Login(){

<<<<<<< HEAD
  

  const navigation = useNavigation();

  const handleNavLogin = () => {
    navigation.navigate("Home")
  }

  const handleNavCadastro = () => {
    navigation.navigate("Register")
  }


=======
  const navigation = useNavigation();

  const handleNavLogin = () => {
    navigation.navigate("Register")
  }
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
  return (
    <View style={styles.container}>
    
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='Digite seu login'
          style={styles.input}
<<<<<<< HEAD
          
=======
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            placeholder='Senha'
            style={styles.input}
<<<<<<< HEAD
            
=======
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
          />

        <Button style={styles.button}

          title="Entrar"
          onPress={() => {
            handleNavLogin();
        }}
        >
          Entrar
        </Button>

<<<<<<< HEAD
        <Text style={styles.fazerCadastro}
        
        title="Cadastro"
        onPress={() => {
          handleNavCadastro();
        }}>
          Realizar cadastro
        </Text>


=======
  
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#0000",
        paddingTop: 120,
<<<<<<< HEAD
        paddingBottom: 40,
=======
        paddingBottom: 60,
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
    },
    button: {
      backgroundColor: '#38a69d',
      width: '100%',
      borderRadius: 4,
      paddingVertical: 8,
<<<<<<< HEAD
      marginTop: 40,
      paddingTop: 40,
=======
      marginTop: 14,
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonRegister: {
<<<<<<< HEAD
      marginTop: 40,
=======
      marginTop: 14,
>>>>>>> 3803dc0bf00e4148ce35b7756a043c8f9b68dda1
      alignSelf: 'center'
    },
    registerText: {
      color: '#a1a1a1'
    }
});

