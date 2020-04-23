import React, { useState, useEffect, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, 
    StatusBar, ScrollView, Clipboard, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons'
import ActionTip from 'react-native-action-tips';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import logo from '../../assets/logo.png'
import iconNotification from '../../../assets/iconNotification.png'
import header from '../../assets/header.png'
import aspas from '../../assets/aspas.png'

import styles from './styles'

export default function Home() {

    const [phrase, setPhrase] = useState('')
    const [loading, setLoading] = useState(false)

    const actionTipRef = useRef(null);

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

    async function getPermitions(){
        const  {status}  = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        
        if(status !== 'granted' ) {
            Alert.alert("Atenção!", "Você não permitiu o envio de notificações, ou deve ir nas configurações do celular para permitir notificações! :)");
            return;
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
              name: 'default',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],
            });
          }
        let notification = Notifications.addListener(handlePush);
    }

    const handlePush = notification => {
        console.log(">>>>>>>", notification);
    }

    const schedule = async () => {

        var date = new Date();
        console.log('Scheduling... to: ' + date)

        date.setDate(date.getDate() + 1)
        date.setHours(8, 0, 0)

        const data = await Notifications.scheduleLocalNotificationAsync({
            title: "LifeUp - Frases Motivacionais",
            body: "Acesse o LifeUp e se inspire hoje! :)",
            channelId: "default",
            data: { some: { data: "mensagem recebida" } }
        }, {
            time: (date.getTime() + 5000),
            repeat: 'day'
        });
    }

    useEffect(() => {
        getPermitions()
        getPhrase()

        setScheduler()
        
        async function setScheduler() {
            var myScheduler = await AsyncStorage.getItem('@scheduler')

            if(!myScheduler) {
                console.log('Vai agendar')
                Notifications.cancelAllScheduledNotificationsAsync()
                schedule()
                await AsyncStorage.setItem('@scheduler', 'scheduled')
            } else {
                console.log('Já agendou')
            }
        }
    }, [])

    async function getPhrase(){
        setLoading(true)
        const response = await api.get('/prhases/phrase')
        
        console.log(response.data[0].phrase)

        setPhrase(response.data[0].phrase)
        setLoading(false)
    }
    
 return (
   <SafeAreaView style={styles.container}>
       <StatusBar barStyle="dark-content"  backgroundColor={'transparent'}/>

       <ActionTip ref={actionTipRef} position={{ top: 40 }} />

       <View style={styles.header}>
           <Image source={logo} />
           <Image source={header} />
       </View>

        <View style={styles.phraseContainer} >
            <Image source={aspas} />
            <ScrollView showsVerticalScrollIndicator={false} >
                {loading &&
                    <View style={styles.loading}> 
                        <ActivityIndicator size="large" color="#0E103D" />
                    </View>
                }

                {!loading &&
                    <Text multiline editable={false} style={styles.phrase}>
                        {phrase}
                    </Text>
                }
                
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
                        <Text style={styles.name}>Luiz Arthur</Text>
                        <Text style={styles.position}>Design</Text>
                    </View>  
                </View>
                <View style={[styles.contact, {marginLeft: 10}]}>
                    <View style={styles.contactName} >
                        <Text style={styles. name}>Eduardo Finotti</Text>
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