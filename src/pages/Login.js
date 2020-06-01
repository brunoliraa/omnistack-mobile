import React, {useState, useEffect} from 'react';
import {View ,Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import tindev from '../assets/tindev.png';
import api from '../services/api';

export default function Login({ navigation }){
const [user, setUser]= useState('');

//[], vazio pra exibir uma unica vez, quando o componente for exibido em tela
//a função será executada se o user voltar o app, fechar ou der um f5
//verifica se o usuario já está logado e o redireciona para a rota Main
useEffect(() => {
    AsyncStorage.getItem('user').then(user=>{
        if(user){
            navigation.navigate('Main', {user})
        }
    })
}, []);

    async function handleLogin(){
        const response = await api.post('/devs',{username:user});
        
        const {_id} =response.data;
        // console.log(_id);
        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user:_id});
    }

    return (
        <View style={styles.container} >
            <Image source={tindev} />
            <TextInput
            placeholder="Digite seu user no gitHub"
            placeholderTextColor="#999"
            value={user}
            onChangeText={setUser}
            style={styles.input}
            />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding:30
    },  
    input:{
        height:46,
        alignSelf: 'stretch',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
        marginTop:20,
        paddingHorizontal:15
    },
    button:{
        height:46,
        alignSelf:'stretch',
        backgroundColor:'#df4723',
        borderRadius:4,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16
    }
});