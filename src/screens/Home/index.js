import React, { useState, useEffect, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Clipboard, Platform, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons'
import ActionTip from 'react-native-action-tips';

import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import logo from '../../assets/logo.png'
import header from '../../assets/header.png'
import aspas from '../../assets/aspas.png'

import styles from './styles'

export default function Home() {

    const [phrase, setPhrase] = useState('')
    const actionTipRef = useRef(null);

    const text = 'Ouvi dizer que só é triste quem queria, seja feliz!'

    function sendMail() {
        MailComposer.composeAsync({
          subject: 'Contato - LifeUp',
          recipients: ['ajudalifeup@gmail.com'],
          body: 'Olá! \n\nUsei o APP Live Up e gostaria de tirar uma dúvida! :) '
        })
    }

    function copyToClipboard(){
        Clipboard.setString(phrase)
        actionTipRef.current.show("Mensagem copiada! :)");
    }
    
    function pastePhrase(){
        getPhrase()
    }

    useEffect(() => {
       getPhrase()
    }, [])

    async function getPhrase(){

        const response = await api.get('/prhases/phrase')
        
        console.log(response.data[0].phrase)

        setPhrase(response.data[0].phrase)
    }
    
 return (
   <SafeAreaView style={styles.container}>
       <StatusBar barStyle="dark-content" />

       <ActionTip
        ref={actionTipRef}
        position={{ top: 40 }}
        />

       <View style={styles.header}>
           <Image source={logo} />
           <Image source={header} />
       </View>

        <View style={styles.phraseContainer} >
            <Image source={aspas} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text multiline editable={false} style={[styles.phrase, {fontFamily: Platform.OS=='ios'?'Noteworthy-Light':''}]}>{phrase}</Text>
                <View style={styles.copyPhraseContent} >
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Feather name="copy" size={20} color="gray"  />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
       
        <View style={styles.buttonContent} >
            <TouchableOpacity onPress={pastePhrase}>
                <LinearGradient start={{x: 0, y: 0.50}} end={{x: 1, y: 0.50}} colors={['#69306D', '#0E103D']}
                    style={styles.phraseButton}>
                    <Text style={styles.phraseButtonText}>Nova Mensagem</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>

        <View style={styles.footer} >
            <Text style={styles.developerBy}>Desenvolvido por: </Text>  

            <View style={styles.contactContainer}>
                <View style={styles.contact}>
                    <View style={styles.contactName} >
                        <Text>Luiz Arthur</Text>
                        <Text style={styles.position}>Design</Text>
                    </View>  
                </View>
                <View style={[styles.contact, {marginLeft: 10}]}>
                    <View style={styles.contactName} >
                        <Text>Eduardo Finotti</Text>
                        <Text style={styles.position}>Desenvolvedor</Text>
                    </View>  
                </View>
            </View>

            <TouchableOpacity onPress={sendMail}>
                <Text style={[styles.developerBy, {fontWeight: 'bold'}]}>Fale conosco: ajudalifeup@gmail.com</Text>  
            </TouchableOpacity>
        </View>
   </SafeAreaView>
  );
}